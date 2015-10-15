<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProceduresTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('procedures', function(Blueprint $table)
		{
            $table->increments('id');
            $table->decimal('price',10,2);
            $table->string('image',128)->default('no_image.jpg');
            $table->boolean('is_visible')->default(1);
            $table->integer('sort_order');
            $table->integer('created_by_user_id')->unsigned()->nullable();
            $table->foreign('created_by_user_id')
                ->references('id')
                ->on('users')
                ->onDelete('set null')
                ->onUpdate('cascade');
            $table->integer('updated_by_user_id')->unsigned()->nullable();
            $table->foreign('updated_by_user_id')
                ->references('id')
                ->on('users')
                ->onDelete('set null')
                ->onUpdate('cascade');
            $table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('procedures');
	}

}
