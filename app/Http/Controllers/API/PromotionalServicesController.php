<?php namespace App\Http\Controllers\API;

use App\Models\PromotionalService;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;


class PromotionalServicesController extends Controller {

    public function index(){
        return PromotionalService::getAllRecords();
    }

    public function store(Request $request)
    {
        return PromotionalService::createRecord($request->all());
    }

    public function show($id){
        return PromotionalService::getSingleRecord($id);
    }

    public function update(Request $request, $id)
    {
        return PromotionalService::updateRecord($request->all(), $id);
    }

    public function destroy($id)
    {
        return PromotionalService::deleteRecord($id);
    }

}
