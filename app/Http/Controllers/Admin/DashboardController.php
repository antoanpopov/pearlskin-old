<?php namespace App\Http\Controllers\Admin;
      use App\Http\Controllers\Controller;

class DashboardController extends Controller {

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
	public function index()
	{
        
        $data = array(
            "title" => trans('interface.home'),
            "footer_text" => "cowwando@gmail.com 2015 All Rights Reserved.",
            "app_version" => "0.01"
            );
        $breadcrumbs = array(
            array("href" => "#", "text" => "asdasd"),
            array("href" => "#", "text" => "asdasd")
            );
		return view('admin\content')->with(compact('data', 'breadcrumbs'));
	}

}
