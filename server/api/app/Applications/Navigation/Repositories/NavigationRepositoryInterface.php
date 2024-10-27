<?php

namespace App\Applications\Navigation\Repositories;

use App\Applications\Navigation\Model\Navigation;
use Illuminate\Database\Eloquent\Collection;

interface NavigationRepositoryInterface
{
    /**
     * Retrieve all navigations.
     *
     * @return Collection|Navigation[]
     */
    public function all(): Collection;

    /**
     * Find a navigation by its ID.
     *
     * @param  int  $id
     * @return Navigation
     */
    public function findById(int $id): Navigation;

    /**
     * Create a new navigation.
     *
     * @param  array<string, mixed>  $data
     * @return Navigation
     */
    public function create(array $data): Navigation;

    /**
     * Update an existing navigation.
     *
     * @param  int $navigationId
     * @param  array<string, mixed>  $data
     * @return Navigation
     */
    public function update(int $navigationId, array $data): Navigation;

    /**
     * Delete an existing navigation.
     *
     * @param  Navigation  $navigation
     * @return bool|null
     */
    public function delete(Navigation $navigation): ?bool;
}
