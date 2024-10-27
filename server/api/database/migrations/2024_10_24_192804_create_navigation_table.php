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
        Schema::create('navigations', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->boolean('authorized')->default(false);
            $table->foreignId('parent_id')->nullable()->constrained('navigations')->onDelete('cascade');
            $table->boolean('visible')->default(true);
            $table->date('livedate')->nullable();
            $table->date('enddate')->nullable();
            $table->nullableMorphs('navigable');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('navigations');
    }
};
