<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Manipulation extends Model {


	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'manipulations';

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['title', 'description', 'client_id', 'doctor_id', 'date_of_manipulation', 'has_discount', 'created_by_user_id','updated_by_user_id'];

	/**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
	protected $hidden = ['created_at', 'updated_at'];

}
