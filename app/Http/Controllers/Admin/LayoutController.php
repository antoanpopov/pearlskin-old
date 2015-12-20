<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class LayoutController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
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
        return view('admin/content')->with(compact('data', 'breadcrumbs'));
    }
}
