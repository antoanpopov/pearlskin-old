<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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

    public function texts(){
        return $this->hasMany('App\Models\DoctorText');
    }

    public static function getOneOrAll($id = null){

          try{
            $languagesList = Language::select('id','name','image','code')->get();

            if($id != null){
                $doctor = Doctor::
                    where('doctors.id',$id)
                    ->join('users as creator','creator.id','=','doctors.created_by_user_id')
                    ->join('users as updater','updater.id','=','doctors.updated_by_user_id')
                    ->select('doctors.id',
                        'image',
                        'has_percent',
                        'sort_order',
                        'is_visible',
                        'phone',
                        'creator.name as created_by_user_name',
                        'updater.name as updated_by_user_name')
                    ->first();

                foreach($languagesList as $language){
                    $textsLanguages[$language->code] = DoctorText::where('doctor_id','=',$doctor->id)->where('language_id','=',$language->id)->select('names','description')->first();
                }
                $doctor->texts = $textsLanguages;
                return $doctor;
            } else {

                $doctorsList = Doctor::
                    join('users as creator','creator.id','=','doctors.created_by_user_id')
                    ->join('users as updater','updater.id','=','doctors.updated_by_user_id')
                    ->select('doctors.id',
                        'image',
                        'has_percent',
                        'sort_order',
                        'is_visible' ,
                        'phone',
                        'creator.name as created_by_user_name',
                        'updater.name as updated_by_user_name')
                    ->get();

                foreach($doctorsList as $doctor){
                    foreach($languagesList as $language){
                        $textsLanguages[$language->code] = DoctorText::where('doctor_id','=',$doctor->id)->where('language_id','=',$language->id)->select('names','description')->first();
                    }
                    $doctor->texts = $textsLanguages;

                }

                return $doctorsList;
            }
        }catch(\Illuminate\Database\QueryException $e){
            return response()->json(array('status' => $e->getMessage()
            ), 500);

        }


    }

    public function createNewRecord($postData, $texts, $file){

        $languagesList = Language::select('code')->where('is_visible','=',1)->get();

        if(!is_null($file)){
            $fileExtension = \Input::file('file')->getClientOriginalExtension();
            $imagePath = public_path() . '/src/admin/img/doctors/';
            $postData['image'] = md5(date('Y-m-d H:i:s')) . "." . $fileExtension;

            while(file_exists($imagePath. $postData['image'])){
                $postData['image'] = md5(date('Y-m-d H:i:s')) . "." . $fileExtension;

            }
            $file->move(public_path() . '/src/admin/img/doctors/', $postData['image']);
        }

        $postData['phone'] = ($postData['phone'] == null)? '' : $postData['phone'];
        $postData['created_by_user_id'] = \Auth::user()->id;
        $postData['updated_by_user_id'] = \Auth::user()->id;
        $postData['sort_order'] = $this->count() + 1;

        $this->fill($postData);
        $this->save();


        foreach($languagesList as $language){

            $doctorText = new DoctorText();
            foreach($texts as $key => $languageText){

                if(strpos($key, $language->code) !== false){
                    $objProperty = (strpos($key, "language_id") !== false)? "language_id" : str_replace(array($language->code,"_"),"",$key);
                    $doctorText->{$objProperty} = $languageText;
                }
            }
            $this->texts()->save($doctorText);

        }


    }

    public function updateRecord($postData, $texts, $file){

        $languagesList = Language::select('code')->where('is_visible','=',1)->get();

        $postData['updated_by_user_id'] = \Auth::user()->id;
        $postData['updated_at'] = date("Y-m-d H:i:s");
        $postData['phone'] = ($postData['phone'] == null)? '' : $postData['phone'];
        var_dump($postData);


        if(!is_null($file)){
            $postData['has_percent'] = ($postData['has_percent'] === 'true');
            $postData['is_visible'] = ($postData['is_visible'] === 'true');
            $fileExtension = \Input::file('file')->getClientOriginalExtension();
            $imagePath = public_path() . '/src/admin/img/doctors/';

            if(file_exists(($imagePath . $postData['image'])) && $postData['image'] !== 'no_image.jpg')
            {
                unlink($imagePath . $postData['image']);
                $postData['image'] = md5(date('Y-m-d H:i:s')) . "." . $fileExtension;

                while(file_exists($imagePath. $postData['image']))
                    $postData['image'] = md5(date('Y-m-d H:i:s')) . "." . $fileExtension;

            }




            $file->move(public_path() . '/src/admin/img/doctors/', $postData['image']);

        }
        var_dump($postData);
        $this->fill($postData);
        $this->save();


        foreach($languagesList as $language){

            $doctorText = DoctorText::firstOrNew([
                        'doctor_id' => $this->id,
                        'language_id' => Language::where('code','=',$language->code)->first()->id
                    ]);

            foreach($texts as $key => $languageText){

                if(strpos($key, $language->code) !== false){
                    $objProperty = (strpos($key, "language_id") !== false)? "language_id" : str_replace(array($language->code,"_"),"",$key);
                    $doctorText->{$objProperty} = $languageText;
                }
            }

            $doctorText->save();

        }

    }

}
