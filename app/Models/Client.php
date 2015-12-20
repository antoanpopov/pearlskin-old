<?php

namespace App\Models;

class Client extends APIBaseModel{


	protected $table = 'clients';

	protected $fillable = ['names', 'phone', 'dob', 'email', 'address', 'created_by_user_id', 'updated_by_user_id'];

	protected $hidden = ['created_at', 'updated_at'];

}
