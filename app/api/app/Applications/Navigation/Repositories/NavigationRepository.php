<?php

namespace App\Applications\Navigation\Repositories;

use App\Applications\Navigation\Model\Navigation;
use Illuminate\Database\Eloquent\Collection;

/**
 * @property Navigation $navigation
 */
class NavigationRepository implements NavigationRepositoryInterface
{
    public function __construct(
        Navigation $navigation
    ) {
        $this->navigation = $navigation;
    }

    /**
     * Retrieve all navigations.
     */
    public function all(): Collection
    {
        return $this->navigation::all();
    }

    /**
     * Find a navigation by ID (with content).
     */
    public function findById(int $id): Navigation
    {
        return $this->navigation::with('content')->findOrFail($id);
    }

    /**
     * Create a new navigation.
     */
    public function create(array $data): Navigation
    {
        return $this->navigation::create($data);
    }

    /**
     * Update an existing navigation model.
     */
    public function update(Navigation $navigation, array $data): Navigation
    {
        $navigation->update($data);
        return $navigation;
    }

    /**
     * Delete the given navigation.
     */
    public function delete(Navigation $navigation): ?bool
    {
        return $navigation->delete();
    }

    /**
     * Load parent and treepath relations.
     */
    public function findWithAncestors(int $id): Navigation
    {
        return $this->navigation::with(['parent', 'treepath' => function ($query) use ($id) {
            $query->where('descendant', $id);
        }])->findOrFail($id);
    }

    /**
     * Find all ancestors of a navigation.
     */
    public function findAncestors(int $id): Collection
    {
        return $this->navigation::whereIn('id', function ($query) use ($id) {
            $query->select('ancestor')
                ->from('navigation_treepath')
                ->where('descendant', $id);
        })->get();
    }

    /**
     * Find all descendants of a navigation.
     */
    public function findDescendants(int $id): Collection
    {
        return $this->navigation::whereIn('id', function ($query) use ($id) {
            $query->select('descendant')
                ->from('navigation_treepath')
                ->where('ancestor', $id);
        })->get();
    }

    /**
     * Find all visible navigations that are currently live.
     */
    public function findLiveNavigations(): Collection
    {
        return $this->navigation::where('visible', true)
            ->where('livedate', '<=', now())
            ->where(function ($query) {
                $query->whereNull('enddate')->orWhere('enddate', '>=', now());
            })
            ->get();
    }

    /**
     * Check if a slug already exists globally.
     * (Can be adjusted if needed to include parent_id/website_id).
     */
    public function doesSlugExist(string $slug): bool
    {
        return $this->navigation::where('slug', $slug)->exists();
    }

    public function updateModel(Navigation $navigation, array $data): Navigation
    {
        $navigation->update($data);
        return $navigation;
    }
}
