<?php

namespace App\Applications\Navigation\Services;

use App\Applications\Navigation\DTO\NavigationDTO;
use App\Applications\Navigation\Model\Navigation;
use Illuminate\Database\Eloquent\Collection;

interface NavigationServiceInterface
{
    /**
     * Retrieve all navigations.
     *
     * @return Collection
     */
    public function getAllNavigations(): Collection;

    /**
     * Retrieve a single navigation by its ID.
     *
     * @param  int  $id
     * @return NavigationDTO
     */
    public function getNavigationById(int $id): NavigationDTO;

    /**
     * Create a new navigation.
     *
     * @param  array<string, mixed>  $data
     * @return Navigation
     */
    public function createNavigation(array $data): Navigation;

    /**
     * Update an existing navigation.
     *
     * @param  Navigation  $navigation
     * @param  array<string, mixed>  $data
     * @return Navigation
     */
    public function updateNavigation(Navigation $navigation, array $data): Navigation;

    /**
     * Delete a navigation.
     *
     * @param  Navigation  $navigation
     * @return bool|null
     */
    public function deleteNavigation(Navigation $navigation): ?bool;

    /**
     * Attach a navigation entry to a morphable model.
     *
     * @param  Navigation  $navigation
     * @param  int  $modelId
     * @param  string  $modelType
     * @return Navigation
     */
    public function attachToModel(Navigation $navigation, int $modelId, string $modelType): Navigation;

    /**
     * Detach the morphable model from a navigation.
     *
     * @param  Navigation  $navigation
     * @return Navigation
     */
    public function detachModel(Navigation $navigation): Navigation;

    /**
     * Get ancestors of a navigation.
     *
     * @param  Navigation  $navigation
     * @return Collection
     */
    public function getAncestors(Navigation $navigation): Collection;

    /**
     * Get descendants of a navigation.
     *
     * @param  Navigation  $navigation
     * @return Collection
     */
    public function getDescendants(Navigation $navigation): Collection;

    /**
     * Get all visible and live navigations.
     *
     * @return Collection
     */
    public function getLiveNavigations(): Collection;

    /**
     * Create a navigation and attach it to a model.
     *
     * @param  NavigationDTO  $dto
     * @param  int  $modelId
     * @param  string  $modelType
     * @return NavigationDTO
     */
    public function createNavigationAndAttach(NavigationDTO $dto, int $modelId, string $modelType): NavigationDTO;
}
