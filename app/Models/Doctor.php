<?php

namespace App\Models;

class Doctor extends APIBaseModel {

	protected $table = 'doctors';

	protected $fillable = ['image', 'is_visible', 'has_percent', 'sort_order', 'phone', 'created_by_user_id','updated_by_user_id','updated_at'];

	protected $hidden = ['created_at', 'updated_at'];

    public function texts(){
        return $this->hasMany('App\Models\DoctorText');
    }


}
