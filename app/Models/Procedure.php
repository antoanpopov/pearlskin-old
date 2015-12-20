<?php

namespace App\Models;

class Procedure extends APIBaseModel {

	protected $table = 'procedures';

	protected $fillable = ['sort_order', 'price', 'is_visible', 'created_by_user_id', 'updated_by_user_id'];

	protected $hidden = ['created_at', 'updated_at'];


    public function texts(){
        return $this->hasMany('App\Models\ProcedureText');
    }

}
