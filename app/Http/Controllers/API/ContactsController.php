<?php

namespace App\Http\Controllers\API;

use App\Models\Contact;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class ContactsController extends Controller
{

    public function index(){
        return Contact::getAllRecords();
    }

    public function store(Request $request)
    {
        return Contact::createRecord($request->all());
    }

    public function show($id){
        return Contact::getSingleRecord($id);
    }

    public function update(Request $request, $id)
    {
        return Contact::updateRecord($request->all(), $id);
    }

    public function destroy($id)
    {
       return Contact::deleteRecord($id);
    }
}
