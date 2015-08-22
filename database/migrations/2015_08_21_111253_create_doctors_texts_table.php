<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDoctorsTextsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('doctors_texts', function(Blueprint $table)
		{
            $table->increments('id');
            $table->string('names',128);
            $table->text('description');
            $table->integer('doctor_id')->unsigned()->nullable();
            $table->foreign('doctor_id')
                ->references('id')
                ->on('doctors')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->integer('language_id')->unsigned()->nullable();
            $table->foreign('language_id')
                ->references('id')
                ->on('languages')
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
		Schema::drop('doctors_texts');
	}

}
