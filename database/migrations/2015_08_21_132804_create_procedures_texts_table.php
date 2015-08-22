<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProceduresTextsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('procedures_texts', function(Blueprint $table)
		{
            $table->increments('id');
            $table->string('title',255);
            $table->text('description');
            $table->integer('procedure_id')->unsigned()->nullable();
            $table->foreign('procedure_id')
                ->references('id')
                ->on('procedures')
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
		Schema::drop('procedures_texts');
	}

}
