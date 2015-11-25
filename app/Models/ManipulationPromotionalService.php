<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ManipulationPromotionalService extends Model {


	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'manipulations_promo_srv';

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['quantity', 'manipulation_id', 'promotional_service_id'];

	/**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
	protected $hidden = ['created_at', 'updated_at'];

    public function procedure()
    {
        return $this->belongsTo('App\Models\Manipulation');
    }

}
