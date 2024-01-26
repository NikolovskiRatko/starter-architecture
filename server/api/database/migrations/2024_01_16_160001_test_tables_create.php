<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class TestTablesCreate extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->nullable();;
            $table->string('description')->nullable();
            $table->dateTime('expiration_time')->nullable();
            $table->timestamps();
        });
        Schema::create('magazines', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title')->nullable();;
            $table->string('content')->nullable();
            $table->dateTime('expiration_time')->nullable();
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
        Schema::dropIfExists('products');
        Schema::dropIfExists('magazines');
    }
}
