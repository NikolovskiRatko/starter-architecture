<?php

namespace App\Applications\Navigation\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class NavigationMenu extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
    ];

    /**
     * Get the navigation items associated with this menu.
     *
     * @return HasMany
     */
    public function items(): HasMany
    {
        return $this->hasMany(NavigationMenuItem::class, 'menu_id');
    }
}
