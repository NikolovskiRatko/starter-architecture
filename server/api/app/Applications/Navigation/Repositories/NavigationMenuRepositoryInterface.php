<?php

namespace App\Applications\Navigation\Repositories;

use App\Applications\Navigation\Model\NavigationMenu;

interface NavigationMenuRepositoryInterface
{
    /**
     * Retrieve all navigation menus.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function all();

    /**
     * Find a navigation menu by its ID.
     *
     * @param int $id
     * @return NavigationMenu|null
     */
    public function find(int $id): ?NavigationMenu;

    /**
     * Find a navigation menu with its items.
     *
     * @param int $id
     * @return NavigationMenu|null
     */
    public function findByIdWithItems(int $id): ?NavigationMenu;

    /**
     * Create a new navigation menu.
     *
     * @param array $data
     * @return NavigationMenu
     */
    public function create(array $data): NavigationMenu;

    /**
     * Update an existing navigation menu.
     *
     * @param NavigationMenu $menu
     * @param array $data
     * @return bool
     */
    public function update(NavigationMenu $menu, array $data): bool;

    /**
     * Delete a navigation menu.
     *
     * @param NavigationMenu $menu
     * @return bool
     */
    public function delete(NavigationMenu $menu): bool;
}
