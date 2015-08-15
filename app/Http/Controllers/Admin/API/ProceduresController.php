<?php namespace App\Http\Controllers\Admin\API;
      use App\Http\Controllers\Controller;
      use App\Models\Procedure;
      use Illuminate\Support\Facades\Request;
      use Illuminate\Http\Response;
      use Auth;
      use App\Http\Controllers\Admin\Api\RequestHelper as RequestHelper;

class ProceduresController extends Controller {

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
    	    $createRecord = RequestHelper::writeAllExcept(new Procedure(),Request::all(),[]);
			return response()->json(['status' => $createRecord['status']],$createRecord['code']);
    	}

	public function read($id = null)
	{

        try{
            if($id != null){
        		 $procedure = Procedure::where('procedures.id',$id)
        		 ->join('users as creator','creator.id','=','procedures.created_by_user_id')
                 ->join('users as updater','updater.id','=','procedures.updated_by_user_id')
                 ->select('procedures.id','procedures.name','price','description','creator.name as created_by_user_name','updater.name as updated_by_user_name')
        		 ->first();
        		 return response()->json($procedure);
            } else {

        		 $proceduresList = Procedure::join('users as creator','creator.id','=','procedures.created_by_user_id')
        		 ->join('users as updater','updater.id','=','procedures.updated_by_user_id')
                 ->select('procedures.id','procedures.name','price','description','creator.name as created_by_user_name','updater.name as updated_by_user_name')
                 ->get();
                 return response()->json($proceduresList);
            }
        }catch(\Illuminate\Database\QueryException $e){
            return response()->json(array('status' => $e->getMessage()
                       ), 500);

        }

       
	}

	public function update($id = null)
	{
	    if($id != null){
	        $postData = Request::except('created_by_user_name','updated_by_user_name');
            $createRecord = RequestHelper::writeAllExcept(new Procedure(),$postData,[]);
            return response()->json(['status' => $createRecord['status']],$createRecord['code']);
        }

	}

	public function delete($id = null)
    {
    	if($id != null){
    		Procedure::where('id','=',$id)->delete();
    	}
    }

}
