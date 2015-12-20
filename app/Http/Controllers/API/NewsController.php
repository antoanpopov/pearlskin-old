<?php

namespace App\Http\Controllers\API;

use App\Models\News;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class NewsController extends Controller
{
    public function index(){
        return News::getAllRecordsWithTexts();
    }

    public function store(Request $request)
    {
        return News::createRecordWithTexts($request->all(), $request->file('file'));
    }

    public function show($id){
        return News::getSingleRecordWithTexts($id);
    }

    public function update(Request $request, $id)
    {
        return News::updateRecordWithTexts($id, $request->all(), $request->file('file'));
    }

    public function destroy($id)
    {
        return News::deleteRecord($id);
    }
}
