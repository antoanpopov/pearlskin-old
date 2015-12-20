<?php namespace App\Models;

use Auth;
use Exception;
use Illuminate\Database\Eloquent\Model;

class APIBaseModel extends Model {
    ///////////////////////////////////////////////////////////////////////////
    //                        HELPER FUNCTIONS                              //
    //////////////////////////////////////////////////////////////////////////
    static function getLanguageCodeByLanguageId($language_id, $languages){
        foreach($languages as $language){
            if($language->id === $language_id){
                return $language->code;
            }
        }
    }

    static function fixRelationshipArrayKeys($result){
        $languages = Language::all();

        if(isset($result->attributes)){
            foreach($result->texts as $key => $value){
                $result->texts[static::getLanguageCodeByLanguageId($value->language_id, $languages)] = $value;
                unset($result->texts[$key]);
            }
        } else {
            foreach ($result as $new) {

//                foreach($new->texts as $key => $value){
//                    dd($value);
//                    $new->texts[static::getLanguageCodeByLanguageId($value->language_id, $languages)] = $value;
//                    unset($new->texts[$key]);
//                }

                foreach($new->getRelations() as $relationKey => $relationValue){

                    if($relationKey === 'texts'){
                        foreach($relationValue as $key => $value) {

                            $new->{$relationKey}[static::getLanguageCodeByLanguageId($value->language_id, $languages)] = $value;
                            unset($new->{$relationKey}[$key]);
                        }
                    }

                    if($relationKey === 'doctor'){
                        foreach($relationValue->texts as $key => $value) {

                            $relationValue->texts[static::getLanguageCodeByLanguageId($value->language_id, $languages)] = $value;
                            unset($relationValue->texts[$key]);
                        }
                    }


                }

            }
        }
        return $result;
    }

    static function fillModel($fields){
        $fieldsArray = [];
        foreach($fields as $key => $value){
            $fieldsArray[$key] = $fields[$key];
        }

        return $fieldsArray;
    }

    //////////////////////////////////////////////////////////////////////


    static function getAllRecordsWithTexts(array $relationships = ['texts']){

        try{

            $statusCode = 200;
            $model = static::with($relationships)->get();
            $model = static::fixRelationshipArrayKeys($model);

            $response = $model;

        }catch (Exception $e){
            $statusCode = 400;
            $response = $e->getMessage();
        }finally{
            return response()->json($response, $statusCode);
        }
    }

    static function getSingleRecordWithTexts($id){

        try{
            $statusCode = 200;
            $request =  static::with('texts')->find($id);

            $response = static::fixRelationshipArrayKeys($request);

        }catch (Exception $e){
            $statusCode = 400;
            $response = "Wrong request!";
        }finally{
            return response()->json($response, $statusCode);
        }

    }

    public static function getAllRecords(){

        try{
            $statusCode = 200;
            $response =  static::all();

        }catch (Exception $e){
            $statusCode = 400;
            $response = $e->getMessage();
        }finally{
            return response()->json($response, $statusCode);
        }
    }

    public static function getSingleRecord($id){

        try{
            $statusCode = 200;
            $response = static::findOrFail($id);

        }catch (Exception $e){
            $statusCode = 400;
            $response = "Wrong request!";
        }finally{
            return response()->json($response, $statusCode);
        }

    }

    static function createRecord($request){
        try{
            $statusCode = 200;
            $response = "success";
            if(isset($request['is_active']))
                $request['is_active'] = (is_bool($request['is_active']))? $request['is_active'] : ($request['is_active'] === 'true');
            if(isset($request['has_percent']))
                $request['has_percent'] = (is_bool($request['has_percent']))? $request['has_percent'] : ($request['has_percent'] === 'true');
            if(isset($request['is_visible']))
                $request['is_visible'] = (is_bool($request['is_visible']))? $request['is_visible'] : ($request['is_visible'] === 'true');

            $request['created_by_user_id'] = Auth::user()->id;
            $request['updated_by_user_id'] = Auth::user()->id;


            static::create($request);

        }catch (Exception $e){
            $statusCode = 400;
        }finally{
            return response()->json($response, $statusCode);
        }
    }

    static function createRecordWithTexts($request, $file = null){
        try{
            $statusCode = 200;
            $response = "success";
            $model =  new static();
            $table = $model->getTable();
            if(!is_null($file)){
                $fileExtension = $file->getClientOriginalExtension();
                $imagePath = public_path() . "/administration/assets/img/$table/";
                $request['image'] = md5(date('Y-m-d H:i:s')) . "." . $fileExtension;
                while(file_exists($imagePath . $request['image'])){
                    $request['image'] = md5(date('Y-m-d H:i:s')) . "." . $fileExtension;

                }
                $file->move($imagePath, $request['image']);
            }

            if(isset($request['is_active']))
                $request['is_active'] = (is_bool($request['is_active']))? $request['is_active'] : ($request['is_active'] === 'true');
            if(isset($request['has_percent']))
                $request['has_percent'] = (is_bool($request['has_percent']))? $request['has_percent'] : ($request['has_percent'] === 'true');
            if(isset($request['is_visible']))
                $request['is_visible'] = (is_bool($request['is_visible']))? $request['is_visible'] : ($request['is_visible'] === 'true');

            $request['created_by_user_id'] = Auth::user()->id;
            $request['updated_by_user_id'] = Auth::user()->id;


            $model->fill($request);
            $model->save();

            $texts = json_decode($request['texts'], true);

                foreach($texts as $text){

                    $model->texts()->create(static::fillModel($text));
                }

        }catch (Exception $e){
            $statusCode = 400;
            $response = $e->getMessage();
        }finally{
            return response()->json($response, $statusCode);
        }

    }

    public static function updateRecord($request, $id){
        try{
            $statusCode = 200;
            $response = "success";

            if(isset($request['is_active']))
                $request['is_active'] = (is_bool($request['is_active']))? $request['is_active'] : ($request['is_active'] === 'true');
            if(isset($request['has_percent']))
                $request['has_percent'] = (is_bool($request['has_percent']))? $request['has_percent'] : ($request['has_percent'] === 'true');
            if(isset($request['is_visible']))
                $request['is_visible'] = (is_bool($request['is_visible']))? $request['is_visible'] : ($request['is_visible'] === 'true');

            $request['updated_by_user_id'] = Auth::user()->id;

            $model = static::findOrFail($id);
            $model->fill($request);
            $model->save();

        }catch (Exception $e){
            $statusCode = 400;
            $response = $e->getMessage();
        }finally{
            return response()->json($response, $statusCode);
        }
    }

    public static function updateRecordWithTexts($id, $request, $file = null){
        try{
            $statusCode = 200;
            $response = "success";

            $model = static::findOrFail($id);
            $table = $model->getTable();

            if(isset($request['is_active']))
                $request['is_active'] = (is_bool($request['is_active']))? $request['is_active'] : ($request['is_active'] === 'true');
            if(isset($request['has_percent']))
                $request['has_percent'] = (is_bool($request['has_percent']))? $request['has_percent'] : ($request['has_percent'] === 'true');
            if(isset($request['is_visible']))
                $request['is_visible'] = (is_bool($request['is_visible']))? $request['is_visible'] : ($request['is_visible'] === 'true');

            $request['updated_by_user_id'] = Auth::user()->id;

            if(!is_null($file)){
                $fileExtension = $file->getClientOriginalExtension();
                $imagePath = public_path() . "/administration/assets/img/$table/";
                $request['image'] = md5(date('Y-m-d H:i:s')) . "." . $fileExtension;
                while(file_exists($imagePath . $request['image'])){
                    $request['image'] = md5(date('Y-m-d H:i:s')) . "." . $fileExtension;
                }
                $file->move($imagePath, $request['image']);
                if(file_exists($imagePath . $model->image) && $model->image !== 'no_image.jpg')
                    unlink($imagePath . $model->image);
            }

            $model->fill($request);
            $model->save();

            $texts = json_decode($request['texts'], true);

            foreach($texts as $text){
                $childModel = $model->texts()->findOrNew($text['id']);
                $childModel->fill(static::fillModel($text));
                $childModel->save();
            }

        }catch (Exception $e){
            $statusCode = 400;
            $response = $e->getMessage();
        }finally{
            return response()->json($response, $statusCode);
        }
    }

    public static function deleteRecord($id){
        try{
            $statusCode = 200;
            $response = "success";

            $model = static::find($id);
            $table = $model->getTable();
            $image = $model->image;
            if(!is_null($image)){
                $absFilePath = public_path() . "/administration/assets/img/$table/".$image;
                if(file_exists($absFilePath) && $image !== 'no_image.jpg')
                    unlink($absFilePath);
            }

            $model->delete();

        }catch (Exception $e){
            $statusCode = 400;
            $response = $e->getMessage();
        }finally{
            return response()->json($response, $statusCode);
        }

    }


}