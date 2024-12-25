<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('navigation_treepath', function (Blueprint $table) {
            $table->unsignedBigInteger('ancestor');
            $table->unsignedBigInteger('descendant');
            $table->unsignedInteger('path_length');
            $table->timestamps();

            $table->foreign('ancestor')->references('id')->on('navigations')->onDelete('cascade');
            $table->foreign('descendant')->references('id')->on('navigations')->onDelete('cascade');
            $table->primary(['ancestor', 'descendant']); // Composite primary key
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('navigation_treepath');
    }
};
