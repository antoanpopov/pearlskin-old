<?php namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Manipulation;
use App\Models\ManipulationProcedure;
use App\Models\DoctorText;
use App\Models\Language;
use App\Models\ManipulationPromotionalService;
use Illuminate\Http\Response;
use Auth;

class ManipulationsController extends Controller
{

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
    }

    /**
     * Show the application welcome screen to the user.
     *
     * @return Response
     */

    public function create()
    {
        $postData = \Input::except('procedures','promotional_services');
        $postDataProcedures = \Input::only('procedures');
        $postDataPromotionalServices = \Input::only('promotional_services');

        $modelInstance = new Manipulation();
        $result = $modelInstance->createNewRecord($postData, $postDataProcedures['procedures'],$postDataPromotionalServices['promotional_services']);
        return $modelInstance->queryResponse($result);
    }

    public function read($id = null)
    {

        $modelInstance = new Manipulation();
        $result = $modelInstance->readRecord($id);
        return $modelInstance->queryResponse($result);

    }

    public function update($id = null)
    {
        $postData = \Input::except('procedures','promotional_services');
        $postDataProcedures = \Input::only('procedures');
        $postDataPromotionalServices = \Input::only('promotional_services');

        $modelInstance = Manipulation::find($id);
        $result = $modelInstance->updateRecord($postData, $postDataProcedures['procedures'],$postDataPromotionalServices['promotional_services']);
        return $modelInstance->queryResponse($result);

    }

    public function delete($id = null)
    {
        $modelInstance = new Manipulation();
        $result = $modelInstance->deleteRecord($id);
        return $modelInstance->queryResponse($result);
    }

}
