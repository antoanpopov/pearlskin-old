<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateManipulationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('manipulations', function(Blueprint $table)
		{
			$table->increments('id');
            $table->string('title',255);
            $table->text('description');
            $table->string('learnt_from',255);
            $table->boolean('client_has_discount')->default(0);
            $table->decimal('amount_total',10,2);
            $table->decimal('amount_discount',10,2);
            $table->decimal('amount_paid',10,2);
            $table->decimal('amount_dept',10,2);
            $table->integer('client_id')->unsigned()->nullable();
            $table->foreign('client_id')
                ->references('id')
                ->on('clients')
                ->onDelete('set null')
                ->onUpdate('cascade');
            $table->integer('doctor_id')->unsigned()->nullable();
            $table->foreign('doctor_id')
                ->references('id')
                ->on('doctors')
                ->onDelete('set null')
                ->onUpdate('cascade');
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
            $table->date('date_of_manipulation');
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
		Schema::drop('manipulations');
	}

}
