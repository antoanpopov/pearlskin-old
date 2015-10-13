<?php namespace App\Http\Controllers\Admin\API;
      use App\Http\Controllers\Controller;
      use App\Models\Procedure;
      use App\Models\ProcedureText;
      use App\Models\Language;
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
            $postData = \Input::only('price');
            $texts = \Input::only('texts');
            $texts = json_decode($texts['texts'], true);
            $file = \Input::file('file');
            $modelInstance = new Procedure();
            $result = $modelInstance->createNewRecord($postData, $texts, $file);
            return $modelInstance->queryResponse($result);
    	}

	public function read($id = null)
	{

        $modelInstance = new Procedure();
        $result = $modelInstance->readRecord($id);
        return $modelInstance->queryResponse($result);
       
	}

	public function update($id = null)
	{
        $postData = \Input::only('price');
        $texts = \Input::only('texts');
        $texts = json_decode($texts['texts'], true);
        $file = \Input::file('file');
        $modelInstance = Procedure::findOrNew($id);
        $result = $modelInstance->updateRecord($postData, $texts, $file);
        return $modelInstance->queryResponse($result);

	}

	public function delete($id = null)
    {
        $modelInstance = new Procedure();
        $result = $modelInstance->deleteRecord($id);
        return $modelInstance->queryResponse($result);
    }

}
