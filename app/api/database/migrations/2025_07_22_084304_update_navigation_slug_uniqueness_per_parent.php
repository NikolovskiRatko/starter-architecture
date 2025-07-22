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
            $table->dropUnique(['slug']);

            // Add composite unique constraint on parent_id + slug
            $table->unique(['parent_id', 'slug'], 'parent_slug_unique');
        });
    }

    public function down(): void
    {
        Schema::table('navigations', function (Blueprint $table) {
            $table->dropUnique('parent_slug_unique');

            // Restore old global unique index on slug
            $table->unique('slug');
        });
    }
};
