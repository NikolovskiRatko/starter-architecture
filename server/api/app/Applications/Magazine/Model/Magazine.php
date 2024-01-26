<?php

namespace App\Applications\Magazine\Model;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Magazine extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'content',
        'expiration_time'
    ];

    public function getUpdatedAtAttribute($value)
    {
        return Carbon::parse($value)->format('Y-m-d H:i:s');
    }
}
