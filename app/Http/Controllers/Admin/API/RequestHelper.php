<?php namespace App\Http\Controllers\Admin\API;
      use App\Http\Controllers\Controller;
      use Auth;

class RequestHelper extends Controller {

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
	public static function writeAllExcept($modelObject, $postData, $excludedFields)
    	{

			try{
			    $record = (isset($postData['id']))? $modelObject::firstOrNew(['id' => $postData['id']]) : $modelObject;

				foreach($excludedFields as $excludedField){
					unset($postData[$excludedField]);
				}
				$postKeys = array_keys($postData);

				foreach($postKeys as $key){
					$record->{$key} = $postData[$key];
				}
				if(!isset($record->id)){$record->created_by_user_id = Auth::user()->id;};
				$record->updated_at = date("Y-m-d H:i:s");
                $record->updated_by_user_id = Auth::user()->id;

				if($record->save()){
					return array('status' => "OK", 'code' => 200);
				}

			}catch(\Illuminate\Database\QueryException $e){
				return array('status' => $e->getMessage(), 'code' => 500);
			}

    	}


}
