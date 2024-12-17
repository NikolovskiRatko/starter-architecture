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
        // Create the `navigation_menus` table to represent menu containers/groups
        Schema::create('navigation_menus', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->text('description')->nullable();
            $table->timestamps();
        });

        // Create the `navigation_menu_items` table for individual menu items
        Schema::create('navigation_menu_items', function (Blueprint $table) {
            $table->id();
            $table->string('label');
            $table->unsignedBigInteger('navigation_id')->nullable();
            $table->foreign('navigation_id')->references('id')->on('navigations')->onDelete('cascade');

            $table->string('external_url')->nullable();
            $table->foreignId('menu_id')->constrained('navigation_menus')->onDelete('cascade');
            $table->unsignedInteger('order');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('navigation_menu_items');
        Schema::dropIfExists('navigation_menus');
    }
};
