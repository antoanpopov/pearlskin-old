<?php namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Client;


class ClientsController extends Controller {

    public function index(){
        return Client::getAllRecords();
    }

    public function store(Request $request)
    {
        return Client::createRecord($request->all());
    }

    public function show($id){
        return Client::getSingleRecord($id);
    }

    public function update(Request $request, $id)
    {
        return Client::updateRecord($request->all(), $id);
    }

    public function destroy($id)
    {
        return Client::deleteRecord($id);
    }

}
