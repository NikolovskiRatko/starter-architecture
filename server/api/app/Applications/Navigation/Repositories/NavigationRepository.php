<?php

namespace App\Applications\Navigation\Repositories;

use App\Applications\Navigation\Model\Navigation;

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
     * Find a navigation by its ID.
     *
     * @param  int  $id
     * @return Navigation
     *
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     */
    public function findById(int $id): Navigation
    {
        return $this->navigation::findOrFail($id);
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
}
