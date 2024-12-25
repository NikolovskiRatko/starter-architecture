<?php

namespace App\Applications\Navigation\Services;

use App\Applications\Navigation\Model\NavigationMenu;
use App\Applications\Navigation\DTO\NavigationMenuDTO;
use Illuminate\Validation\ValidationException;

interface NavigationMenuServiceInterface
{
    /**
     * Retrieve all navigation menus.
     *
     * @return mixed
     */
    public function getAll();

    /**
     * Retrieve a navigation menu by its ID.
     *
     * @param int $id
     * @return NavigationMenu|null
     */
    public function getById(int $id): ?NavigationMenu;

    /**
     * Retrieve a navigation menu by ID, including its associated items.
     *
     * @param int $id
     * @return NavigationMenuDTO|null
     */
    public function getByIdWithItems(int $id): ?NavigationMenuDTO;

    /**
     * Create a new navigation menu.
     *
     * @param NavigationMenuDTO $menuDTO
     * @return NavigationMenu
     * @throws ValidationException
     */
    public function create(NavigationMenuDTO $menuDTO): NavigationMenu;

    /**
     * Update an existing navigation menu by its ID.
     *
     * @param int $id
     * @param NavigationMenuDTO $menuDTO
     * @return bool
     * @throws ValidationException
     */
    public function update(int $id, NavigationMenuDTO $menuDTO): bool;

    /**
     * Delete a navigation menu.
     *
     * @param NavigationMenu $menu
     * @return bool
     */
    public function delete(NavigationMenu $menu): bool;
}
