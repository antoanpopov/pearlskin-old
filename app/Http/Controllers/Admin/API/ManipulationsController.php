<?php namespace App\Http\Controllers\Admin\API;
      use App\Http\Controllers\Controller;
      use App\Models\Manipulation;
      use App\Models\ManipulationProcedure;
      use App\Models\DoctorText;
      use App\Models\Language;
      use Illuminate\Http\Response;
      use Auth;

class ManipulationsController extends Controller {

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
    	$postDataManipulation = \Input::except('procedures');
        $postDataManipulationProcedures = \Input::only('procedures');
        $createRecord = RequestHelper::writeAllExcept(new Manipulation(),$postDataManipulation,[]);
            if(!empty($postDataManipulationProcedures['procedures']) && $createRecord['id']){

                foreach($postDataManipulationProcedures['procedures'] as $manipulationProcedure){

                    $postData = [];
                    $postData['procedure_id'] = $manipulationProcedure;
                    $postData['manipulation_id'] = $createRecord['id'];

                    $createManipulationProcedures = RequestHelper::writeAllExcept(new ManipulationProcedure(),$postData,['created_by_user_id','updated_by_user_id']);
                }
            }
		return response()->json(['status' => $createRecord['status']],$createRecord['code']);
    	}

	public function read($id = null)
	{

        try{

            $languagesList = Language::select('id','name','image','code')->get();

            if($id != null){
                $manipulation = Manipulation::where('manipulations.id',$id)
        		 ->join('users as creator','creator.id','=','manipulations.created_by_user_id')
                 ->join('users as updater','updater.id','=','manipulations.updated_by_user_id')
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
                     'manipulations.learnt_from',
                     'creator.name as created_by_user_name',
                     'updater.name as updated_by_user_name')
        		 ->first();
                $proceduresArray = [];
                $manipulationProcedures = ManipulationProcedure::where('manipulation_id',$manipulation->id)->get();
                foreach($manipulationProcedures as $procedure){
                    array_push($proceduresArray, $procedure->procedure_id);
                }
                $manipulation->procedures = $proceduresArray;
//                  $manipulation->procedures = ManipulationProcedure::where('manipulation_id',$manipulation->id)
//                      ->join('procedures','procedures.id','=','manipulations_procedures.procedure_id')
//                      ->select('procedures.id')
//                      ->get();

        		 return response()->json($manipulation);
            } else {

        		 $manipulationsList = Manipulation::join('users as creator','creator.id','=','manipulations.created_by_user_id')
        		 ->join('users as updater','updater.id','=','manipulations.updated_by_user_id')
                 ->leftJoin('clients','clients.id', '=', 'manipulations.client_id')
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
                     'manipulations.date_of_manipulation' ,
                     'clients.names as client_names',
                     'clients.id as client_id',
                     'clients.phone as client_phone',
                     'creator.name as created_by_user_name',
                     'updater.name as updated_by_user_name')
                 ->get();


                foreach($manipulationsList as $manipulation){
                    foreach($languagesList as $language){
                        $textsLanguages[$language->code] = DoctorText::where('doctor_id','=',$manipulation->doctor_id)->where('language_id','=',$language->id)->select('names')->first();
                    }
                    $manipulation->texts = $textsLanguages;
                }

                 return response()->json($manipulationsList);
            }
        }catch(\Illuminate\Database\QueryException $e){
            return response()->json(array('status' => $e->getMessage()
                       ), 500);

        }

       
	}

	public function update($id = null)
	{
	    if($id != null){
            $postDataManipulation = \Input::except('procedures');
            $postDataManipulationProcedures = \Input::only('procedures');
            $createRecord = RequestHelper::writeAllExcept(new Manipulation(),$postDataManipulation,['created_by_user_name','updated_by_user_name']);
            if($createRecord['id']){

                $manipulationCurrentProcedures = ManipulationProcedure::where('manipulation_id','=', $id)
                    ->select('id','procedure_id')
                    ->get();

                foreach($manipulationCurrentProcedures as $manipulationCurrentProcedure){

                    $checkIfExists = array_search($manipulationCurrentProcedure->procedure_id, $postDataManipulationProcedures['procedures']);
                    if($checkIfExists === false){
                        $manipulationCurrentProcedure->delete();
                    }

                }
                foreach($postDataManipulationProcedures['procedures'] as $manipulationNewProcedure){

                    $checkIfExists = ManipulationProcedure::where('manipulation_id', '=', $id)
                        ->where('procedure_id','=',$manipulationNewProcedure)->first();
                    if($checkIfExists === NULL){
                        $postData = [
                            'procedure_id' => $manipulationNewProcedure,
                            'manipulation_id' => $createRecord['id']
                        ];

                        $createManipulationProcedures = RequestHelper::writeAllExcept(new ManipulationProcedure(),$postData,['created_by_user_id','updated_by_user_id']);
                    }
                }


            }
            return response()->json(['status' => $createRecord['status']],$createRecord['code']);
        }

	}

	public function delete($id = null)
    {
    	if($id != null){
    		Manipulation::where('id','=',$id)->delete();
    	}
    }

}
