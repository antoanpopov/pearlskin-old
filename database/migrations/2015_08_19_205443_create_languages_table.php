<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLanguagesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::create('languages', function (Blueprint $table) {

            $table->increments('id');
            $table->string('name', 32);
            $table->string('code', 5);
            $table->string('locale', 255);
            $table->string('image', 64);
            $table->string('file', 32);
            $table->boolean('is_visible')->default(1);
            $table->integer('sort_order');
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
        Schema::drop('languages');
	}

}
