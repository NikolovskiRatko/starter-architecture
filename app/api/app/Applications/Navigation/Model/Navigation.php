<?php

namespace App\Applications\Navigation\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class Navigation extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'authorized',
        'parent_id',
        'visible',
        'livedate',
        'enddate',
        'static',
    ];

    protected static function boot()
    {
        parent::boot();

        // Prevent deletion of static navigations
        static::deleting(function ($navigation) {
            if ($navigation->static) {
                throw new \Exception("Static navigations cannot be deleted.");
            }

            // Delete the associated treepath entries
            $navigation->deleteTreepath();
        });

        // Prevent updates to static navigations
        static::updating(function ($navigation) {
            if ($navigation->static) {
                throw new \Exception("Static navigations cannot be updated.");
            }

            // If the parent_id is being changed, update the treepath
            if ($navigation->isDirty('parent_id')) {
                $navigation->updateTreepath();
            }
        });

        // Insert treepath entries after a navigation is created
        static::created(function ($navigation) {
            $navigation->insertTreepath();
        });
    }

    public function treepath()
    {
        return $this->hasMany(
            NavigationTreePath::class,
            'descendant',
            'id'
        );
    }

    /**
     * Insert entries into the treepath table for a newly created navigation.
     */
    public function insertTreepath()
    {
        // Self-reference
        DB::table('navigation_treepath')->insert([
            'ancestor' => $this->id,
            'descendant' => $this->id,
            'path_length' => 0,
        ]);

        // Ancestor paths
        if ($this->parent_id) {
            $ancestors = DB::table('navigation_treepath')
                ->where('descendant', $this->parent_id)
                ->get();

            foreach ($ancestors as $ancestor) {
                DB::table('navigation_treepath')->insert([
                    'ancestor' => $ancestor->ancestor,
                    'descendant' => $this->id,
                    'path_length' => $ancestor->path_length + 1,
                ]);
            }
        }
    }

    /**
     * Update entries in the treepath table if the parent changes.
     */
    public function updateTreepath()
    {
        $this->deleteTreepath();
        $this->insertTreepath();
    }

    /**
     * Delete entries from the treepath table for this navigation.
     */
    public function deleteTreepath()
    {
        DB::table('navigation_treepath')
            ->where('descendant', $this->id)
            ->delete();
    }

    public function parent()
    {
        return $this->belongsTo(Navigation::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(Navigation::class, 'parent_id');
    }

    /**
     * Polymorphic relationship to associate the navigation with any content model.
     *
     * @return MorphTo
     */
    public function content()
    {
        return $this->morphTo();
    }

    /**
     * Get the parent path for the navigation.
     *
     * @return string
     */
    public function getParentPathAttribute(): string
    {
        $ancestorSlugs = DB::table('navigation_treepath')
            ->join('navigations', 'navigations.id', '=', 'navigation_treepath.ancestor')
            ->where('navigation_treepath.descendant', $this->id)
            ->where('navigation_treepath.ancestor', '!=', $this->id)
            ->orderBy('navigation_treepath.path_length', 'DESC')
            ->pluck('navigations.slug');

        return $ancestorSlugs->implode('/');
    }

    /**
     * Get the full path for the navigation.
     *
     * @return string
     */
    public function getPathAttribute(): string
    {
        // Use the parent path and append the current slug
        $parentPath = $this->parent_path;
        $separator = $parentPath && $this->slug ? '/' : '';

        return '/' . ltrim(rtrim($parentPath . $separator . $this->slug, '/'), '/');
    }
}
