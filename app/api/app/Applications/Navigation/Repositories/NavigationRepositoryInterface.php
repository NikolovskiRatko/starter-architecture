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
     * @param int $id
     * @return Navigation
     */
    public function findById(int $id): Navigation;

    /**
     * Create a new navigation.
     *
     * @param array<string, mixed> $data
     * @return Navigation
     */
    public function create(array $data): Navigation;

    /**
     * Update an existing navigation.
     *
     * @param Navigation $navigation
     * @param array<string, mixed> $data
     * @return Navigation
     */
    public function update(Navigation $navigation, array $data): Navigation;

    /**
     * Delete an existing navigation.
     *
     * @param Navigation $navigation
     * @return bool|null
     */
    public function delete(Navigation $navigation): ?bool;

    /**
     * Find all visible navigations that are currently live.
     *
     * @return Collection
     */
    public function findLiveNavigations(): Collection;

    /**
     * Find all ancestors of a navigation by its ID.
     *
     * @param int $id
     * @return Collection
     */
    public function findAncestors(int $id): Collection;

    /**
     * Find all descendants of a navigation by its ID.
     *
     * @param int $id
     * @return Collection
     */
    public function findDescendants(int $id): Collection;

    /**
     * Check if a navigation with the given slug exists.
     *
     * @param string $slug
     * @return bool
     */
    public function doesSlugExist(string $slug): bool;

    public function updateModel(Navigation $navigation, array $data): Navigation;
}
