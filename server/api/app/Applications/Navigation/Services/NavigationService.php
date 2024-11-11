<?php

namespace App\Applications\Navigation\Services;

use App\Applications\Navigation\DTO\NavigationDTO;
use App\Applications\Navigation\Repositories\NavigationRepositoryInterface;
use App\Applications\Navigation\Model\Navigation;
use Illuminate\Database\Eloquent\Collection;

class NavigationService implements NavigationServiceInterface
{
    /**
     * @var NavigationRepositoryInterface
     */
    protected NavigationRepositoryInterface $repository;

    /**
     * NavigationService constructor.
     *
     * @param  NavigationRepositoryInterface  $repository
     */
    public function __construct(NavigationRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Retrieve all navigations.
     *
     * @return Collection|Navigation[]
     */
    public function getAllNavigations(): Collection
    {
        return $this->repository->all();
    }

    /**
     * Retrieve a single navigation by its ID.
     *
     * @param  int  $id
     * @return NavigationDTO
     */
    public function getNavigationById(int $id): NavigationDTO
    {
        $navigation = $this->repository->findById($id);
        return NavigationDTO::fromModel($navigation);
    }

    /**
     * Create a new navigation.
     *
     * @param  array<string, mixed>  $data
     * @return Navigation
     */
    public function createNavigation(array $data): Navigation
    {
        return $this->repository->create($data);
    }

    /**
     * Update an existing navigation.
     *
     * @param  int  $navigationId
     * @param  array<string, mixed>  $data
     * @return Navigation
     */
    public function updateNavigation(int $navigationId, array $data): Navigation
    {
        return $this->repository->update($navigationId, $data);
    }

    /**
     * Delete a navigation.
     *
     * @param  Navigation  $navigation
     * @return bool|null
     */
    public function deleteNavigation(Navigation $navigation): ?bool
    {
        return $this->repository->delete($navigation);
    }
}
