<?php namespace App\Http\Controllers\Admin\API;
use App\Http\Controllers\Controller;
use App\Models\Doctor;
use App\Models\DoctorText;
use App\Models\Language;
use Illuminate\Support\Facades\Request;
use Illuminate\Http\Response;
use Auth;
use App\Http\Controllers\Admin\Api\RequestHelper as RequestHelper;

class DoctorsController extends Controller {

    /*
    |--------------------------------------------------------------------------
    | Welcome Controller
    |--------------------------------------------------------------------------
    |
    | This controller renders the "marketing page" for the application and
    | is configured to only allow guests. Like most of the other sample
    | controllers, you are free to modify or remove it as you desire.
    |
    */

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(RequestHelper $requestHelper)
    {
        //	$this->middleware('auth');
    }

    /**
     * Show the application welcome screen to the user.
     *
     * @return Response
     */

    public function create()
    {
        var_dump(\Input::all());
        $postData = \Input::all();
        if(\Input::hasFile('file')){
            $fileExtension = \Input::file('file')->getClientOriginalExtension();
            $postData['image'] = \Hash::make(date('Y-m-d H:i:s')) . "." . $fileExtension;
            \Input::file('file')->move(public_path() . '/src/admin/img/doctors/', $postData['image']);
        }

        $createRecord = RequestHelper::writeAllExcept(new Doctor(),$postData,['file', 'texts']);
        $texts = \Input::only('texts');

        foreach($texts as $text){

            foreach($text as $key => $lang){

                $procedureText = new DoctorText();
                $procedureText->names = $lang['names'];
                $procedureText->description = $lang['description'];
                $procedureText->language_id = $lang['language_id'];
                $procedureText->doctor_id = $createRecord['id'];
                $procedureText->save();

            }

        }
        //	return response()->json(['status' => $createRecord['status']],$createRecord['code']);
    }

    public function read($id = null)
    {

        try{
            $languagesList = Language::select('id','name','image','code')->get();

            if($id != null){
                $doctor = Doctor::where('doctors.id',$id)
                    ->join('users as creator','creator.id','=','doctors.created_by_user_id')
                    ->join('users as updater','updater.id','=','doctors.updated_by_user_id')
                    ->select('doctors.id','image','has_percent','sort_order','is_visible','creator.name as created_by_user_name','updater.name as updated_by_user_name')
                    ->first();

                foreach($languagesList as $language){
                    $textsLanguages[$language->code] = DoctorText::where('doctor_id','=',$doctor->id)->where('language_id','=',$language->id)->select('names','description')->first();
                }
                $doctor->texts = $textsLanguages;
                return response()->json($doctor);
            } else {

                $doctorsList = Doctor::
                join('users as creator','creator.id','=','doctors.created_by_user_id')
                    ->join('users as updater','updater.id','=','doctors.updated_by_user_id')
                    ->select('doctors.id','image','has_percent','sort_order','is_visible' ,'creator.name as created_by_user_name','updater.name as updated_by_user_name')
                    ->get();

                foreach($doctorsList as $doctor){
                    foreach($languagesList as $language){
                        $textsLanguages[$language->code] = DoctorText::where('doctor_id','=',$doctor->id)->where('language_id','=',$language->id)->select('names','description')->first();
                    }
                    $doctor->texts = $textsLanguages;

                }

                return response()->json($doctorsList);
            }
        }catch(\Illuminate\Database\QueryException $e){
            return response()->json(array('status' => $e->getMessage()
            ), 500);

        }


    }

    public function update($id = null)
    {
        if($id != null){
            $postData = \Input::all();
            if(\Input::hasFile('file')){
                $fileExtension = \Input::file('file')->getClientOriginalExtension();
                $postData['image'] = $postData['names'] . "." . $fileExtension;
                \Input::file('file')->move(public_path() . '/src/admin/img/doctors/', $postData['image']);
            }
            $createRecord = RequestHelper::writeAllExcept(new Doctor(),$postData,['created_by_user_name','updated_by_user_name']);
            return response()->json(['status' => $createRecord['status']],$createRecord['code']);
        }

    }

    public function delete($id = null)
    {
        if($id != null){
            Doctor::where('id','=',$id)->delete();
        }
    }

}
