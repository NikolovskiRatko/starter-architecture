<?php

namespace App\Applications\Navigation\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

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
    ];

    public function parent()
    {
        return $this->belongsTo(Navigation::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(Navigation::class, 'parent_id');
    }

    public function navigable()
    {
        return $this->morphTo();
    }

    public function getFullUrlAttribute(): string
    {
        return $this->parent
            ? rtrim($this->parent->full_url, '/') . '/' . ltrim($this->slug, '/')
            : $this->slug;
    }
}
