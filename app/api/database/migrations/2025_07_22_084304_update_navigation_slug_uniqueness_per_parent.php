<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('navigations', function (Blueprint $table) {
            // Drop old unique constraint on slug
            // We can use this unique constraint becuase we have soft deletes and MySql still take it into consideration the delted ones
            $table->dropUnique(['slug']);
        });
    }

    public function down(): void
    {
        Schema::table('navigations', function (Blueprint $table) {
            $table->dropUnique('parent_slug_unique');
        });
    }
};
