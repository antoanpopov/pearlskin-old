<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NewsText extends Model {


	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'news_texts';

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['title', 'description', 'language_id'];

	/**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
	protected $hidden = ['created_at', 'updated_at'];

    public function news()
    {
        return $this->belongsTo('App\Models\News');
    }


}
