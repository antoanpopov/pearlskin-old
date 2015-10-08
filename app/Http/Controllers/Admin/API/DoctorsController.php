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
        $postData = \Input::only(
            'has_percent',
            'is_visible',
            'phone'
        );

        $texts = \Input::except(
            'has_percent',
            'is_visible',
            'phone',
            'file'
        );

        $file = \Input::file('file');

        $modelInstance = new Doctor();
        $modelInstance->createNewRecord($postData,$texts, $file);

    }

    public function read($id = null)
    {
        $doctorsQuery = Doctor::getOneOrAll($id);

        return response()->json($doctorsQuery);

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

        $texts = \Input::except(
            'id',
            'sort_order',
            'has_percent',
            'is_visible',
            'phone',
            'file',
            'image'
        );
        $file = \Input::file('file');

        $modelInstance = Doctor::find($id);
        $modelInstance->updateRecord($postData,$texts, $file);
        $status = $modelInstance->getResult();
        $status->code;
        $status->message;
        return response()->json($status->message,$status->code);
       // return response()->json($modelInstance->updateRecord($postData,$texts, $file),app('Illuminate\Http\Response')->status());

    }

    public function delete($id = null)
    {
        if($id != null){
            Doctor::where('id','=',$id)->delete();
        }
    }

}
