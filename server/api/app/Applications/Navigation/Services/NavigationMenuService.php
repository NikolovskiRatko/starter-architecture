<?php

namespace App\Applications\Navigation\Services;

use App\Applications\Navigation\Model\NavigationMenu;
use App\Applications\Navigation\Repositories\NavigationMenuRepository;
use App\Applications\Navigation\DTO\NavigationMenuDTO;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class NavigationMenuService implements NavigationMenuServiceInterface
{
    protected NavigationMenuRepository $repository;

    public function __construct(NavigationMenuRepository $repository)
    {
        $this->repository = $repository;
    }

    public function getAll()
    {
        return $this->repository->all();
    }

    public function getById(int $id): ?NavigationMenu
    {
        return $this->repository->find($id);
    }

    /**
     * Retrieve a navigation menu by ID, including its associated items.
     *
     * @param int $id
     * @return NavigationMenu|null
     */
    public function getByIdWithItems(int $id): ?NavigationMenu
    {
        // Fetch the menu with its items using Eloquent eager loading
        return $this->repository->findByIdWithItems($id);
    }

    /**
     * Create a new Navigation Menu.
     *
     * @param NavigationMenuDTO $menuDTO
     * @return NavigationMenu
     * @throws ValidationException
     */
    public function create(NavigationMenuDTO $menuDTO): NavigationMenu
    {
        return $this->repository->create($menuDTO->toArray());
    }

    /**
     * Update an existing Navigation Menu.
     *
     * @param int $id
     * @param NavigationMenuDTO $menuDTO
     * @return bool
     * @throws ValidationException
     */
    public function update(int $id, NavigationMenuDTO $menuDTO): bool
    {
        $menu = $this->repository->find($id);

        if (!$menu) {
            return false;
        }

        return $this->repository->update($menu, $menuDTO->toArray());
    }


    public function delete(NavigationMenu $menu): bool
    {
        return $this->repository->delete($menu);
    }

    protected function validate(array $data): void
    {
        $rules = [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:500',
        ];

        Validator::make($data, $rules)->validate();
    }
}
