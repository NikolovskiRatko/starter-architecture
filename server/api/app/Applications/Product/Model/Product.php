<?php

namespace App\Applications\Product\Model;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Product extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
        'expiration_time'
    ];

    public function getUpdatedAtAttribute($value)
    {
        return Carbon::parse($value)->format('Y-m-d H:i:s');
    }
}
