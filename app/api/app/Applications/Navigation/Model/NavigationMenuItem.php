<?php

namespace App\Applications\Navigation\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class NavigationMenuItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'navigation_id',
        'external_url',
        'menu_id',
        'label',
        'order',
    ];

    /**
     * Define a relationship to the parent NavigationMenu.
     *
     * @return BelongsTo
     */
    public function menu(): BelongsTo
    {
        return $this->belongsTo(NavigationMenu::class, 'menu_id');
    }

    /**
     * Define a relationship to the Navigation model, if linked.
     *
     * @return BelongsTo|null
     */
    public function navigation(): ?BelongsTo
    {
        return $this->belongsTo(Navigation::class, 'navigation_id');
    }
}
