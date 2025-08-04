<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('navigations', function (Blueprint $table) {
            $table->string('path')->nullable()->index();
        });
    }

    public function down()
    {
        Schema::table('navigations', function (Blueprint $table) {
            $table->dropIndex(['path']);
            $table->dropColumn('path');
        });
    }
};
