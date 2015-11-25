<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Manipulation extends Model {


	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'manipulations';

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['amount_total', 'amount_paid', 'amount_discount', 'amount_dept',
        'title', 'description', 'client_id', 'doctor_id', 'date_of_manipulation', 'has_discount', 'created_by_user_id','updated_by_user_id'];

	/**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
	protected $hidden = ['created_at', 'updated_at'];

    protected $statusCode = 200;
    protected $statusMessage =  "success";

    public function procedures(){
        return $this->hasMany('App\Models\ManipulationProcedure');
    }
    public function promotionalServices(){
        return $this->hasMany('App\Models\ManipulationPromotionalService');
    }

    public function readRecord($id = null){
        try {

            $languagesList = Language::select('id', 'name', 'image', 'code')->get();

            if ($id != null) {
                $manipulation = Manipulation::where('id', '=',$id)
                    ->with('procedures')
                    ->with('promotionalServices')
                    ->select(
                        'manipulations.amount_total',
                        'manipulations.amount_discount',
                        'manipulations.amount_paid',
                        'manipulations.amount_dept',
                        'manipulations.id',
                        'manipulations.title',
                        'manipulations.client_id',
                        'manipulations.description',
                        'manipulations.doctor_id',
                        'manipulations.learnt_from')
                    ->first();

                return $manipulation;
            } else {

                $manipulationsList = Manipulation::join('users as creator', 'creator.id', '=', 'manipulations.created_by_user_id')
                    ->join('users as updater', 'updater.id', '=', 'manipulations.updated_by_user_id')
                    ->leftJoin('clients', 'clients.id', '=', 'manipulations.client_id')
                    ->select(
                        'manipulations.amount_total',
                        'manipulations.amount_discount',
                        'manipulations.amount_paid',
                        'manipulations.amount_dept',
                        'manipulations.id',
                        'manipulations.doctor_id',
                        'manipulations.title',
                        'manipulations.learnt_from',
                        'manipulations.description',
                        'manipulations.date_of_manipulation',
                        'clients.names as client_names',
                        'clients.id as client_id',
                        'clients.phone as client_phone',
                        'creator.name as created_by_user_name',
                        'updater.name as updated_by_user_name')
                    ->get();


                foreach ($manipulationsList as $manipulation) {
                    foreach ($languagesList as $language) {
                        $textsLanguages[$language->code] = DoctorText::where('doctor_id', '=', $manipulation->doctor_id)->where('language_id', '=', $language->id)->select('names')->first();
                    }
                    $manipulation->texts = $textsLanguages;
                }

                return $manipulationsList;
            }
        } catch (Exception $ex) {
            $this->setResult(500, $ex->getMessage());

        }

    }

    public function createNewRecord($postData, $procedures, $promotionalServices){

        $this->created_by_user_id = \Auth::user()->id;
        $this->updated_by_user_id = \Auth::user()->id;
        $this->fill($postData);
        $this->save();


        foreach($procedures as $procedureId){
            $procedureObj = new ManipulationProcedure();
            $procedureObj->fill($procedureId);
            $this->procedures()->save($procedureObj);
        }

        foreach($promotionalServices as $promotionalService){
            $procedureObj = new ManipulationPromotionalService();
            $procedureObj->fill($promotionalService);
            $this->promotionalServices()->save($procedureObj);
        }


    }

    public function updateRecord($postData, $procedures, $promotionalServices){

        try{

            $this->updated_by_user_id = \Auth::user()->id;
            $this->updated_at = date('Y-m-d H:i:s');
            $this->fill($postData);

            $proceduresIds = [];
            $promotionalServicesIds = [];

            foreach($procedures as $procedure){

                $procedureObj = ManipulationProcedure::findOrNew($procedure['id']);
                $procedureObj->fill($procedure);
                $proceduresIds[] = $procedureObj->id;

                $this->procedures()->save($procedureObj);
            }

            foreach($promotionalServices as $promotionalService){
                $promotionalServiceObj = ManipulationPromotionalService::findOrNew($promotionalService['id']);
                $promotionalServiceObj->fill($promotionalService);
                $promotionalServicesIds[] = $promotionalServiceObj->id;

                $this->promotionalServices()->save($promotionalServiceObj);
            }

            $this->procedures()->whereNotIn('id', $proceduresIds)->delete();
            $this->promotionalServices()->whereNotIn('id', $promotionalServicesIds)->delete();
            $this->save();

            $this->setResult(200, "success");

        }catch (Exception $ex){

            $this->setResult(500, $ex->getMessage());
        }


    }

    public function deleteRecord($id){

        try{
            if($id != null){
                Manipulation::where('id','=',$id)->delete();
            }else
                throw new Exception("Missing or incorrect id");

        }catch (Exception $ex){
            $this->setResult(500, $ex->getMessage());
        }

    }


    public function queryResponse($result){
        return ($this->statusCode == 200)? response()->json($result, $this->statusCode) : response()->json($this->statusMessage, $this->statusCode);
    }

    public function setResult($statusCode = 200, $statusMessage = "success"){
        $this->statusCode = $statusCode;
        $this->statusMessage = $statusMessage;
    }

}
