<?php

namespace App\Applications\User\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class User extends Authenticatable implements HasMedia
{
    use HasApiTokens, HasFactory, Notifiable;
    use HasRoles;
    use SoftDeletes;
    use InteractsWithMedia;

    const ADMIN = 'admin';
    const EDITOR = 'editor';
    const COLLABORATOR = 'collaborator';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'email_verified_at',
        'password',
        'is_disabled',
        'activation_code'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'roles',
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array<string>
     */
    protected $appends = [
        'permissions_array',
        'role',
        'avatar_url',
        'avatar_thumbnail'
    ];

    public function registerMediaCollections(): void
    {
        $this
            ->addMediaCollection('avatars')
            ->singleFile();
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this
            ->addMediaConversion('thumb')
            ->fit(Fit::Contain, 100, 100)
            ->sharpen(10)
            ->nonQueued();
    }

    public function getPermissionsArrayAttribute()
    {
        return $this->getAllPermissions()->pluck('name')->toArray();
    }

    public function getRoleAttribute()
    {
        return $this->roles()->first()->id;
    }

    /**
     * Get the URL of the user's avatar.
     *
     * @return string|null
     */
    public function getAvatarUrlAttribute(): ?string
    {
        // Return the URL of the first media item in the 'avatars' collection
        return $this->getFirstMediaUrl('avatars') ?: null;
    }

    /**
     * Get the URL of the user's avatar.
     *
     * @return string|null
     */
    public function getAvatarThumbnailAttribute(): ?string
    {
        // Return the URL of the first media item in the 'avatars' collection
        return $this->getFirstMediaUrl('avatars', 'thumb') ?: null;
    }
}
