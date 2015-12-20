<?php

namespace App\Models;

class Contact extends APIBaseModel
{
    protected $table = 'contacts';

    protected $fillable = ['name', 'address_1', 'address_2', 'email', 'stationary_phone', 'mobile_phone', 'email'];

    protected $hidden = ['created_at', 'updated_at'];

}
