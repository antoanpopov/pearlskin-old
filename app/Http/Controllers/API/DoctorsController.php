<?php namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;
use App\Models\Doctor;
use App\Models\DoctorText;
use App\Models\Language;
use Illuminate\Support\Facades\Request;
use Illuminate\Http\Response;
use JWTAuth;

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
        $postData = \Input::only(
            'has_percent',
            'is_visible',
            'phone'
        );
        $texts = \Input::only('texts');
        $texts = json_decode($texts['texts'], true);
        $file = \Input::file('file');

        $modelInstance = new Doctor();
        $result = $modelInstance->createNewRecord($postData,$texts, $file);
        return $modelInstance->queryResponse($result);

    }

    public function read($id = null)
    {
        $modelInstance = new Doctor();
        $result = $modelInstance->readRecord($id);
        return $modelInstance->queryResponse($result);

    }

    public function update($id = null)
    {

        $postData = \Input::only(
            'has_percent',
            'is_visible',
            'phone',
            'image',
            'id'
        );

        $texts = \Input::only('texts');
        $texts = json_decode($texts['texts'], true);
        $file = \Input::file('file');

        $modelInstance = Doctor::find($id);
        $result = $modelInstance->updateRecord($postData,$texts, $file);
        return $modelInstance->queryResponse($result);

    }

    public function delete($id = null)
    {
        $modelInstance = new Doctor();
        $result = $modelInstance->deleteRecord($id);
        return $modelInstance->queryResponse($result);
    }

}
