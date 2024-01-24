<?php

namespace App\Applications\Magazine\Model;

use Illuminate\Database\Eloquent\Model;

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
}
