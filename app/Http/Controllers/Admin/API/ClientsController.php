<?php namespace App\Http\Controllers\Admin\API;
      use App\Http\Controllers\Controller;
      use App\Models\Client;
      use Illuminate\Support\Facades\Request;
      use Auth;

class ClientsController extends Controller {

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
	public function __construct()
	{
		$this->middleware('auth');
	}

	/**
	 * Show the application welcome screen to the user.
	 *
	 * @return Response
	 */
	public function create()
    	{
            $modelInstance = new Client();
            $result = $modelInstance->createNewRecord(\Input::all());
            return $modelInstance->queryResponse($result);

    	}

	public function read($id = null)
	{

        $modelInstance = new Client();
        $result = $modelInstance->readRecord($id);
        return $modelInstance->queryResponse($result);
       
	}

	public function update($id = null)
	{
	    $postData = \Input::all();
        $modelInstance = Client::findOrNew($id);
        $result = $modelInstance->updateRecord($postData);
        return $modelInstance->queryResponse($result);

	}

	public function delete($id = null)
    {
        $modelInstance = new Client();
        $result = $modelInstance->deleteRecord($id);
        return $modelInstance->queryResponse($result);

    }

}
