<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateManipulationsProceduresTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('manipulations_procedures', function(Blueprint $table)
		{
			$table->increments('id');
            $table->integer('manipulation_id')->unsigned()->nullable();
            $table->foreign('manipulation_id')
                ->references('id')
                ->on('manipulations')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->integer('procedure_id')->unsigned()->nullable();
            $table->foreign('procedure_id')
                ->references('id')
                ->on('procedures')
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
		Schema::drop('manipulations_procedures');
	}

}
