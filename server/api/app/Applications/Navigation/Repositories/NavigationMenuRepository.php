<?php

namespace App\Applications\Navigation\Repositories;

use App\Applications\Navigation\Model\NavigationMenu;

class NavigationMenuRepository implements NavigationMenuRepositoryInterface
{
    protected NavigationMenu $navigationMenu;

    /**
     * NavigationMenuRepository constructor.
     *
     * @param NavigationMenu $navigationMenu
     */
    public function __construct(NavigationMenu $navigationMenu)
    {
        $this->navigationMenu = $navigationMenu;
    }

    /**
     * Retrieve all navigation menus.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function all()
    {
        return $this->navigationMenu->all();
    }

    /**
     * Find a navigation menu by its ID.
     *
     * @param int $id
     * @return NavigationMenu|null
     */
    public function find(int $id): ?NavigationMenu
    {
        return $this->navigationMenu->find($id);
    }

    /**
     * Find a navigation menu by ID, including its items.
     *
     * @param int $id
     * @return NavigationMenu|null
     */
    public function findByIdWithItems(int $id): ?NavigationMenu
    {
        return $this->navigationMenu->with(['items' => function ($query) {
            $query->orderBy('order', 'asc');
        }])->find($id);
    }

    /**
     * Find a navigation menu by slug, including its ordered items.
     *
     * @param string $slug
     * @return NavigationMenu|null
     */
    public function findBySlugWithItems(string $slug): ?NavigationMenu
    {
        return NavigationMenu::with(['items' => function ($query) {
            $query->orderBy('order', 'asc');
        }])->where('slug', $slug)->first();
    }

    /**
     * Create a new navigation menu.
     *
     * @param array $data
     * @return NavigationMenu
     */
    public function create(array $data): NavigationMenu
    {
        return $this->navigationMenu->create($data);
    }

    /**
     * Update an existing navigation menu.
     *
     * @param NavigationMenu $menu
     * @param array $data
     * @return bool
     */
    public function update(NavigationMenu $menu, array $data): bool
    {
        return $menu->update($data);
    }

    /**
     * Delete a navigation menu.
     *
     * @param NavigationMenu $menu
     * @return bool
     */
    public function delete(NavigationMenu $menu): bool
    {
        return $menu->delete();
    }
}
