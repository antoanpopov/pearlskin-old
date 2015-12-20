<?php

namespace App\Http\Controllers\API;

use App\Models\Procedure;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProceduresController extends Controller {

    public function index(){
        return Procedure::getAllRecordsWithTexts();
    }

    public function show($id){
        return Procedure::getSingleRecordWithTexts($id);
    }

    public function store(Request $request)
    {
        return Procedure::createRecordWithTexts($request->all(), $request->file('file'));
    }

    public function update(Request $request, $id)
    {
        return Procedure::updateRecordWithTexts($id, $request->all(), $request->file('file'));
    }

    public function destroy($id)
    {
        return Procedure::deleteRecord($id);
    }

}
