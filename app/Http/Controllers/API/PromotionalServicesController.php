<?php namespace App\Http\Controllers\API;

use App\Models\PromotionalService;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use JWTAuth;


class PromotionalServicesController extends Controller {


	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
	}

	/**
	 * Show the application welcome screen to the user.
	 *
	 * @return Response
	 */
	public function create()
    	{
            $modelInstance = new PromotionalService();
            $result = $modelInstance->createNewRecord(\Input::all());
            return $modelInstance->queryResponse($result);

    	}

	public function read($id = null)
	{
        $modelInstance = new PromotionalService();
        $result = $modelInstance->readRecord($id);
        return $modelInstance->queryResponse($result);
       
	}

	public function update($id = null)
	{
	    $postData = \Input::all();
        $modelInstance = PromotionalService::findOrNew($id);
        $result = $modelInstance->updateRecord($postData);
        return $modelInstance->queryResponse($result);

	}

	public function delete($id = null)
    {
        $modelInstance = new PromotionalService();
        $result = $modelInstance->deleteRecord($id);
        return $modelInstance->queryResponse($result);

    }

}
