<?php

namespace App\Applications\Navigation\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NavigationTreePath extends Model
{
    use HasFactory;

    protected $table = 'navigation_treepath';

    public $timestamps = false;

    protected $fillable = ['ancestor', 'descendant', 'path_length'];
}
