<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Client extends Model {


	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'clients';

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['names', 'phone', 'dob', 'email', 'address', 'created_by_user_id', 'updated_by_user_id'];

	/**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
	protected $hidden = ['created_at', 'updated_at'];

}
