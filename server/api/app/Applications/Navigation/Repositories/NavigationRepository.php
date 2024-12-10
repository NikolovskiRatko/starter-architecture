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
     *
     * @return \Illuminate\Database\Eloquent\Collection|Navigation[]
     */
    public function all(): \Illuminate\Database\Eloquent\Collection
    {
        return $this->navigation::all();
    }

    /**
     * Find a navigation by its ID, including its related content.
     *
     * @param  int  $id
     * @return Navigation
     *
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     */
    public function findById(int $id): Navigation
    {
        // Eager-load the content relationship
        return $this->navigation::with('content')->findOrFail($id);
    }

    /**
     * Create a new navigation.
     *
     * @param  array<string, mixed>  $data
     * @return Navigation
     */
    public function create(array $data): Navigation
    {
        return $this->navigation::create($data);
    }

    /**
     * Update an existing navigation.
     *
     * @param  int $navigationId
     * @param  array<string, mixed>  $data
     * @return Navigation
     */
    public function update(int $navigationId, array $data): Navigation
    {
        $navigation = $this->navigation->findOrFail($navigationId);
        $navigation->update($data);
        return $navigation;
    }

    /**
     * Delete an existing navigation.
     *
     * @param  Navigation  $navigation
     * @return bool|null
     */
    public function delete(Navigation $navigation): ?bool
    {
        return $navigation->delete();
    }

    public function findWithAncestors(int $id): Navigation
    {
        return $this->navigation::with(['parent'])
            ->with(['treepath' => function ($query) use ($id) {
                $query->where('descendant', $id);
            }])
            ->findOrFail($id);
    }

    /**
     * Find all ancestors of a navigation by its ID.
     *
     * @param  int  $id
     * @return Collection
     */
    public function findAncestors(int $id): Collection
    {
        return $this->navigation::whereIn('id', function ($query) use ($id) {
            $query->select('ancestor')
                ->from('navigation_treepath')
                ->where('descendant', $id);
        })->get();
    }

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
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function findLiveNavigations(): Collection
    {
        return $this->navigation->where('visible', true)
            ->where('livedate', '<=', now())
            ->where(function ($query) {
                $query->whereNull('enddate')
                    ->orWhere('enddate', '>=', now());
            })
            ->get();
    }

    public function doesSlugExist(string $slug): bool
    {
        return $this->navigation::where('slug', $slug)->exists();
    }
}
