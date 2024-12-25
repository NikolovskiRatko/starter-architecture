<?php

namespace App\Applications\Navigation\Repositories;

use App\Applications\Navigation\Model\NavigationMenuItem;

class NavigationMenuItemRepository implements NavigationMenuItemRepositoryInterface
{
    protected NavigationMenuItem $navigationMenuItem;

    /**
     * Constructor to initialize NavigationMenuItem model.
     *
     * @param NavigationMenuItem $navigationMenuItem
     */
    public function __construct(NavigationMenuItem $navigationMenuItem)
    {
        $this->navigationMenuItem = $navigationMenuItem;
    }

    /**
     * Retrieve all navigation menu items.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function all()
    {
        return $this->navigationMenuItem->all();
    }

    /**
     * Find a navigation menu item by its ID.
     *
     * @param int $id
     * @return NavigationMenuItem|null
     */
    public function find(int $id): ?NavigationMenuItem
    {
        return $this->navigationMenuItem->find($id);
    }

    /**
     * Create a new navigation menu item.
     *
     * @param array $data
     * @return NavigationMenuItem
     */
    public function create(array $data): NavigationMenuItem
    {
        return $this->navigationMenuItem->create($data);
    }

    /**
     * Update an existing navigation menu item.
     *
     * @param NavigationMenuItem $item
     * @param array $data
     * @return bool
     */
    public function update(NavigationMenuItem $item, array $data): bool
    {
        return $item->update($data);
    }

    /**
     * Delete a navigation menu item.
     *
     * @param NavigationMenuItem $item
     * @return bool
     */
    public function delete(NavigationMenuItem $item): bool
    {
        return $item->delete();
    }

    /**
     * Get the maximum order value for a specific menu.
     *
     * @param int $menuId
     * @return int
     */
    public function getMaxOrderByMenuId(int $menuId): int
    {
        return $this->navigationMenuItem
            ->where('menu_id', $menuId)
            ->max('order') ?? 1;
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
        $item = $this->navigationMenuItem->find($itemId);

        if (!$item || $item->menu_id !== $menuId) {
            return false;
        }

        $currentOrder = $item->order;

        if ($newOrder > $currentOrder) {
            // Moving down: decrease order of items between current and new position
            $this->navigationMenuItem
                ->where('menu_id', $menuId)
                ->where('order', '>', $currentOrder)
                ->where('order', '<=', $newOrder)
                ->decrement('order');
        } else {
            // Moving up: increase order of items between new and current position
            $this->navigationMenuItem
                ->where('menu_id', $menuId)
                ->where('order', '>=', $newOrder)
                ->where('order', '<', $currentOrder)
                ->increment('order');
        }

        return $item->update(['order' => $newOrder]);
    }
}
