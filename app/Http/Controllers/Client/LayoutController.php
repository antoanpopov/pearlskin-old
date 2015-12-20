<?php

namespace App\Http\Controllers\Client;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\User;


class LayoutController extends Controller
{
    public function __construct(){
    }

    public function index()
    {
        return view('client/layout');
    }

}
