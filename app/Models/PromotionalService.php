<?php namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Model;

class PromotionalService extends Model {


	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'promotional_services';

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['title', 'discount', 'is_active', 'created_by_user_id', 'updated_by_user_id'];

	/**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
	protected $hidden = ['created_at', 'updated_at'];
    public $statusCode = 200;
    public $statusMessage =  "success";

    public function createNewRecord($postData){

        try {

            $this->fill($postData);
            $this->created_by_user_id = \Auth::user()->id;
            $this->updated_by_user_id = \Auth::user()->id;

            $this->save();

            $this->setResult(200, "success");

        }catch (Exception $ex){

            $this->setResult(500, $ex->getMessage());
        }

    }

    public function readRecord($id = null){

        try{
            if($id != null){
                $result = $this->select('title','discount','is_active')->where('id',$id)->first();
            } else {
                $result = $this->all();
            }

            $this->setResult(200, "success");
            return $result;
        }catch (Exception $ex){
            $this->setResult(500, $ex->getMessage());
        }

    }

    public function updateRecord($postData){
        try{
            $this->fill($postData);
            $this->updated_by_user_id = \Auth::user()->id;
            $this->updated_at = date('Y-m-d H:i:s');
            $this->save();
        }catch (Exception $ex){
            $this->setResult(500, $ex->getMessage());
        }
    }

    public function deleteRecord($id){
        try{
            if($id != null){
                $result =  $this->where('id','=',$id)->delete();
                if($result === 1)
                   $this->setResult(200, "success");
                else
                    throw new Exception("Missing or incorrect id");
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
