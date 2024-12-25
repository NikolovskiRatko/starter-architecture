<?php

namespace App\Applications\Navigation\Services;

use App\Applications\Navigation\Model\NavigationMenuItem;
use App\Applications\Navigation\DTO\NavigationMenuItemDTO;
use Illuminate\Validation\ValidationException;

interface NavigationMenuItemServiceInterface
{
    /**
     * Retrieve all navigation menu items.
     *
     * @return mixed
     */
    public function getAll();

    /**
     * Find a navigation menu item by ID.
     *
     * @param int $id
     * @return NavigationMenuItem|null
     */
    public function getById(int $id): ?NavigationMenuItem;

    /**
     * Create a new navigation menu item.
     *
     * @param NavigationMenuItemDTO $data
     * @return NavigationMenuItem
     * @throws ValidationException
     */
    public function create(NavigationMenuItemDTO $data): NavigationMenuItem;

    /**
     * Update an existing navigation menu item by ID.
     *
     * @param int $id
     * @param NavigationMenuItemDTO $data
     * @return bool
     * @throws ValidationException
     */
    public function update(int $id, NavigationMenuItemDTO $data): bool;

    /**
     * Delete a navigation menu item.
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool;

    /**
     * Get the next available order value for a specific menu.
     *
     * @param int $menuId
     * @return int
     */
    public function getNextOrderValue(int $menuId): int;

    /**
     * Reorder a navigation menu item.
     *
     * @param int $menuId
     * @param int $itemId
     * @param int $newOrder
     * @return bool
     */
    public function reorderItem(int $menuId, int $itemId, int $newOrder): bool;
}
