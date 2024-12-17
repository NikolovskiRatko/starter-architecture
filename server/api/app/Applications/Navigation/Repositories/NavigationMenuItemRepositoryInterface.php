<?php

namespace App\Applications\Navigation\Repositories;

use App\Applications\Navigation\Model\NavigationMenuItem;

interface NavigationMenuItemRepositoryInterface
{
    /**
     * Retrieve all navigation menu items.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function all();

    /**
     * Find a navigation menu item by its ID.
     *
     * @param int $id
     * @return NavigationMenuItem|null
     */
    public function find(int $id): ?NavigationMenuItem;

    /**
     * Create a new navigation menu item.
     *
     * @param array $data
     * @return NavigationMenuItem
     */
    public function create(array $data): NavigationMenuItem;

    /**
     * Update an existing navigation menu item.
     *
     * @param NavigationMenuItem $item
     * @param array $data
     * @return bool
     */
    public function update(NavigationMenuItem $item, array $data): bool;

    /**
     * Delete a navigation menu item.
     *
     * @param NavigationMenuItem $item
     * @return bool
     */
    public function delete(NavigationMenuItem $item): bool;

    /**
     * Get the maximum order value for a specific menu.
     *
     * @param int $menuId
     * @return int
     */
    public function getMaxOrderByMenuId(int $menuId): int;

    /**
     * Reorder a menu item within its menu.
     *
     * @param int $menuId
     * @param int $itemId
     * @param int $newOrder
     * @return bool
     */
    public function reorderItem(int $menuId, int $itemId, int $newOrder): bool;
}
