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
	protected $fillable = ['names', 'image', 'is_visible', 'percent_service', 'sort_order','created_by_user_id','updated_by_user_id'];

	/**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
	protected $hidden = ['created_at', 'updated_at'];

}
