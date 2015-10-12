<?php namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Model;

class Procedure extends Model {


	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'procedures';

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['sort_order', 'price', 'is_visible', 'created_by_user_id', 'updated_by_user_id'];

	/**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
	protected $hidden = ['created_at', 'updated_at'];
    public $statusCode = 200;
    public $statusMessage =  "success";

    public function texts(){
        return $this->hasMany('App\Models\ProcedureText');
    }

    public function createNewRecord($postData, $texts, $file){

        try {

            $this->fill($postData);
            $this->created_by_user_id = \Auth::user()->id;
            $this->updated_by_user_id = \Auth::user()->id;
            $this->save();

            foreach($texts as $text){
                $textObj = new ProcedureText();
                $textObj->fill($text);
                $this->texts()->save($textObj);
            }

        }catch (Exception $ex){

            $this->setResult(500, $ex->getMessage());
        }

    }

    public function readRecord($id = null){

        try{
            if($id != null){
                $procedure = Procedure::find($id);
                foreach($procedure->texts as $key => $text){
                    unset($procedure->texts[$key]);
                    $key = Language::where('id','=',$text->language_id)->select('code')->first()->code;
                    $procedure->texts[$key] = $text;
                }
                return $procedure;
            } else {
                $proceduresList = Procedure::with('texts')->get();
                foreach($proceduresList as $procedure){

                    foreach($procedure->texts as $key => $text){
                        unset($procedure->texts[$key]);
                        $key = Language::where('id','=',$text->language_id)->select('code')->first()->code;
                        $procedure->texts[$key] = $text;
                    }
                }
                return $proceduresList;
            }
        }catch(\Illuminate\Database\QueryException $e){
            return response()->json(array('status' => $e->getMessage()
            ), 500);
        }

    }

    public function updateRecord($postData, $texts, $file){
        try{

            $this->fill($postData);
            $this->updated_by_user_id = \Auth::user()->id;
            $this->updated_at = date('Y-m-d H:i:s');

            foreach($texts as $text){
                $textObj = ProcedureText::findOrNew($text['id']);
                $textObj->fill($text);
                $this->texts()->save($textObj);
            }

            $this->save();


        }catch (Exception $ex){
            $this->setResult(500, $ex->getMessage());
        }
    }

    public function deleteRecord($id){
        try{
            if($id != null){
                Procedure::where('id','=',$id)->delete();
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
