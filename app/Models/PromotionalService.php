<?php namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Model;

class PromotionalService extends APIBaseModel {


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
	protected $fillable = ['title', 'price', 'discount', 'is_active', 'created_by_user_id', 'updated_by_user_id'];

	/**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
	protected $hidden = ['created_at', 'updated_at'];
    public $statusCode = 200;
    public $statusMessage =  "success";

}
