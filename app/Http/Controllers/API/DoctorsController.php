<?php namespace App\Http\Controllers\API;

use App\Models\Doctor;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class DoctorsController extends Controller {

    public function index(){
        return Doctor::getAllRecordsWithTexts();
    }

    public function show($id){
        return Doctor::getSingleRecordWithTexts($id);
    }

    public function store(Request $request)
    {
        return Doctor::createRecordWithTexts($request->all(), $request->file('file'));
    }

    public function update(Request $request, $id)
    {
        return Doctor::updateRecordWithTexts($id, $request->all(), $request->file('file'));
    }

    public function destroy($id)
    {
        return Doctor::deleteRecord($id);
    }

}
