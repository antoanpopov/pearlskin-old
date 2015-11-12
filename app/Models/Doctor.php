<?php namespace App\Models;
use Exception;
use Illuminate\Database\Eloquent\Model;
use Symfony\Component\HttpFoundation\Response;

class Doctor extends Model {


	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'doctors';

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['image', 'is_visible', 'has_percent', 'sort_order', 'phone', 'created_by_user_id','updated_by_user_id','updated_at'];

	/**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
	protected $hidden = ['created_at', 'updated_at'];
    protected $statusCode = 200;
    protected $statusMessage =  "success";

    public function texts(){
        return $this->hasMany('App\Models\DoctorText');
    }

    public function readRecord($id = null){

          try{

            if($id != null){
                $doctor = Doctor::find($id);

                if(!$doctor) throw new Exception("Missing or incorrect id");

                foreach($doctor->texts as $key => $text){
                    unset($doctor->texts[$key]);
                    $key = Language::where('id','=',$text->language_id)->select('code')->first()->code;
                    $doctor->texts[$key] = $text;
                }
                return $doctor;
            } else {

                $doctorsList = Doctor::with('texts')->get();
                foreach($doctorsList as $doctor){
                    if(property_exists($doctor, 'texts')){
                        foreach($doctor->texts as $key => $text){
                            unset($doctor->texts[$key]);
                            $key = Language::where('id','=',$text->language_id)->select('code')->first()->code;
                            $doctor->texts[$key] = $text;
                        }
                    }

                }
                return $doctorsList;
            }
        }catch(Exception $ex){
              $this->setResult(500, $ex->getMessage());

        }


    }

    public function createNewRecord($postData, $texts, $file){

        if(!is_null($file)){
            $fileExtension = \Input::file('file')->getClientOriginalExtension();
            $imagePath = public_path() . '/administration/assets/img/doctors/';
            $postData['image'] = md5(date('Y-m-d H:i:s')) . "." . $fileExtension;

            while(file_exists($imagePath. $postData['image'])){
                $postData['image'] = md5(date('Y-m-d H:i:s')) . "." . $fileExtension;

            }
            $file->move(public_path() . '/administration/assets/img/doctors/', $postData['image']);
        }
        $postData['has_percent'] = ($postData['has_percent'] === 'true');
        $postData['is_visible'] = ($postData['is_visible'] === 'true');
        $postData['phone'] = ($postData['phone'] == null)? '' : $postData['phone'];
        $postData['created_by_user_id'] = \Auth::user()->id;
        $postData['updated_by_user_id'] = \Auth::user()->id;
        $postData['sort_order'] = $this->count() + 1;

        $this->fill($postData);
        $this->save();


        foreach($texts as $text){
            $textObj = new DoctorText();
            $textObj->fill($text);
            $this->texts()->save($textObj);
        }


    }

    public function updateRecord($postData, $texts, $file){

            try{

            $postData['updated_by_user_id'] = \Auth::user()->id;
            $postData['updated_at'] = date("Y-m-d H:i:s");
            $postData['phone'] = ($postData['phone'] == null)? '' : $postData['phone'];

            if(!is_null($file)){

                $fileExtension = \Input::file('file')->getClientOriginalExtension();
                $postData['has_percent'] = ($postData['has_percent'] === 'true');
                $postData['is_visible'] = ($postData['is_visible'] === 'true');
                $postData['image'] = md5(date('Y-m-d H:i:s')) . "." . $fileExtension;
                $currentImage = $this->select('image')->where('id','=',$this->id)->first()->image;
                $imagePath = public_path() . '/administration/assets/img/doctors/';

                if(file_exists($imagePath.$currentImage) && $currentImage !== 'no_image.jpg')
                    unlink($imagePath.$currentImage);

                if(file_exists(($imagePath . $postData['image'])) && $postData['image'] !== 'no_image.jpg')
                {
                    unlink($imagePath . $postData['image']);


                    while(file_exists($imagePath. $postData['image']))
                        $postData['image'] = md5(date('Y-m-d H:i:s')) . "." . $fileExtension;

                }


                $file->move(public_path() . '/administration/assets/img/doctors/', $postData['image']);

            }

            $this->fill($postData);
            foreach($texts as $text){
                $textObj = new DoctorText();
                $textObj->fill($text);
                $this->texts()->save($textObj);
            }
            $this->save();




                $this->setResult(200, "success");
            }catch (Exception $ex){

                $this->setResult(500, $ex->getMessage());
            }


    }

    public function deleteRecord($id){
        try{
            if($id != null){
                $image = $this->select('image')->where('id','=',$id)->first()->image;
                $absFilePath = public_path() . '/administration/assets/img/doctors/'.$image;
                if(file_exists($absFilePath) && $image !== 'no_image.jpg')
                    unlink($absFilePath);
                Doctor::where('id','=',$id)->delete();
            }else
                throw new Exception("Missing or incorrect id");

        }catch (Exception $ex){
            $this->setResult(500, $ex->getMessage());
        }

    }


    public function queryResponse($result){
        return ($this->statusCode == 200)? response()->json($result, $this->statusCode) : response()->json($this->statusMessage, $this->statusCode);
    }

    public function setResult($statusCode = 200, $statusMessage = "success"){
        $this->statusCode = $statusCode;
        $this->statusMessage = $statusMessage;
    }
}
