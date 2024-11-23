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
     * @return Collection|NavigationDTO[]
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
     * @param  int $navigationId
     * @param  array<string, mixed>  $data
     * @return Navigation
     */
    public function updateNavigation(int $navigationId, array $data): Navigation;

    /**
     * Delete a navigation.
     *
     * @param  Navigation  $navigation
     * @return bool|null
     */
    public function deleteNavigation(Navigation $navigation): ?bool;
}
