<?php

namespace App\Applications\Navigation\Services;

use App\Applications\Navigation\Model\NavigationMenuItem;
use App\Applications\Navigation\Repositories\NavigationMenuItemRepositoryInterface;
use App\Applications\Navigation\DTO\NavigationMenuItemDTO;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Validator;

class NavigationMenuItemService implements NavigationMenuItemServiceInterface
{
    protected NavigationMenuItemRepositoryInterface $repository;

    public function __construct(NavigationMenuItemRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Retrieve all navigation menu items.
     *
     * @return mixed
     */
    public function getAll()
    {
        return $this->repository->all();
    }

    /**
     * Find a navigation menu item by ID.
     *
     * @param int $id
     * @return NavigationMenuItem|null
     */
    public function getById(int $id): ?NavigationMenuItem
    {
        return $this->repository->find($id);
    }

    /**
     * Create a new navigation menu item.
     *
     * @param NavigationMenuItemDTO $data
     * @return NavigationMenuItem
     * @throws ValidationException
     */
    public function create(NavigationMenuItemDTO $data): NavigationMenuItem
    {
        $this->validate($data->toArray());
        return $this->repository->create($data->toArray());
    }

    /**
     * Update an existing navigation menu item.
     *
     * @param int $id
     * @param NavigationMenuItemDTO $data
     * @return bool
     * @throws ValidationException
     */
    public function update(int $id, NavigationMenuItemDTO $data): bool
    {
        $item = $this->repository->find($id);
        if (!$item) {
            return false;
        }

        $this->validate($data->toArray());
        return $this->repository->update($item, $data->toArray());
    }

    /**
     * Delete a navigation menu item.
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool
    {
        $item = $this->repository->find($id);
        return $item ? $this->repository->delete($item) : false;
    }

    /**
     * Validate navigation menu item data.
     *
     * @param array $data
     * @throws ValidationException
     */
    protected function validate(array $data): void
    {
        $rules = [
            'navigation_id' => 'nullable|integer|exists:navigations,id',
            'external_url' => 'nullable|string|url|max:255',
            'menu_id' => 'required|integer|exists:navigation_menus,id',
        ];

        Validator::make($data, $rules)->validate();
    }

    /**
     * Get the next available order value for a specific menu.
     *
     * @param int $menuId
     * @return int
     */
    public function getNextOrderValue(int $menuId): int
    {
        return $this->repository->getMaxOrderByMenuId($menuId) + 1;
    }

    /**
     * Reorder a menu item within its menu.
     *
     * @param int $menuId
     * @param int $itemId
     * @param int $newOrder
     * @return bool
     */
    public function reorderItem(int $menuId, int $itemId, int $newOrder): bool
    {
        $result = $this->repository->reorderItem($menuId, $itemId, $newOrder);

        if (!$result) {
            throw new Exception("Failed to reorder navigation menu item");
        }

        return $result;
    }
}
