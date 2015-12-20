<?php

namespace App\Models;

class News extends APIBaseModel {


	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'news';

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['image', 'is_visible', 'sort_order', 'created_by_user_id','updated_by_user_id'];

	/**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
	protected $hidden = ['created_at', 'updated_at'];

    public function texts(){
        return $this->hasMany('App\Models\NewsText');
    }

}
