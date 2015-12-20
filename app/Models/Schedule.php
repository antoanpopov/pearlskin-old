<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Schedule extends APIBaseModel {


	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'schedule';

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['client_id', 'doctor_id', 'appointed_at', 'created_by_user_id', 'updated_by_user_id'];

	/**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
	protected $hidden = ['created_at', 'updated_at'];
    public $statusCode = 200;
    public $statusMessage =  "success";

    public function client()
    {
        return $this->belongsTo('App\Models\Client');
    }
    public function doctor()
    {
        return $this->belongsTo('App\Models\Doctor','doctor_id','id');
    }

    public function readRecord($id = null){

        try{
            if($id != null){
                $schedule = Schedule::find($id);
                return $schedule;
            } else {
                $scheduleList = Schedule::with('client','doctor.texts')->get();
                foreach($scheduleList as $schedule){

                    if($schedule->doctor_id == NULL) break;
                    foreach($schedule->doctor->texts as $key => $value){
                        unset($schedule->doctor->texts[$key]);
                        $key = Language::where('id','=',$value->language_id)->select('code')->first()->code;
                        $schedule->doctor->texts[$key] = $value;
                    }
                }
                return $scheduleList;
            }
        }catch(\Illuminate\Database\QueryException $e){
            return response()->json(array('status' => $e->getMessage()
            ), 500);
        }

    }
}
