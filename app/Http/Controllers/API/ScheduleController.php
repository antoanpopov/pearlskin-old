<?php

namespace App\Http\Controllers\API;

use App\Models\Schedule;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ScheduleController extends Controller {

    public function index(){
        return Schedule::getAllRecordsWithTexts(['client', 'doctor.texts']);
    }

    public function show($id){
        return Schedule::getSingleRecord($id);
    }

    public function store(Request $request)
    {
        return Schedule::createRecord($request->all(), $request->file('file'));
    }

    public function update(Request $request, $id)
    {
        return Schedule::updateRecord($request->all(), $id);
    }

    public function destroy($id)
    {
        return Schedule::deleteRecord($id);
    }

}
