<?php

namespace App\Applications\Navigation\Services;

use App\Applications\Navigation\DTO\NavigationDTO;
use App\Applications\Navigation\Repositories\NavigationRepositoryInterface;
use App\Applications\Navigation\Model\Navigation;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;

class NavigationService implements NavigationServiceInterface
{
    protected NavigationRepositoryInterface $repository;

    public function __construct(NavigationRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Retrieve all navigations as DTOs.
     */
    public function getAllNavigations(): Collection
    {
        return $this->repository->all();
    }

    /**
     * Retrieve a single navigation by ID and return as DTO.
     */
    public function getNavigationById(int $id): NavigationDTO
    {
        $navigation = $this->repository->findById($id);
        return NavigationDTO::fromModel($navigation);
    }

    /**
     * Create a new navigation.
     */
    public function createNavigation(array $data): Navigation
    {
        return $this->repository->create($data);
    }

    /**
     * Update an existing navigation.
     */
    public function updateNavigation(Navigation $navigation, array $data): Navigation
    {
        return $this->repository->updateModel($navigation, $data);
    }

    /**
     * Delete a navigation.
     */
    public function deleteNavigation(Navigation $navigation): ?bool
    {
        return $this->repository->delete($navigation);
    }

    /**
     * Attach a navigation to a morphable model.
     */
    public function attachToModel(Navigation $navigation, int $modelId, string $modelType): Navigation
    {
        if (!class_exists($modelType)) {
            throw new InvalidArgumentException("Invalid model type: {$modelType}");
        }

        $model = $modelType::findOrFail($modelId);
        $navigation->content()->associate($model);
        $navigation->save();

        return $navigation;
    }

    /**
     * Detach the morphable model from a navigation.
     */
    public function detachModel(Navigation $navigation): Navigation
    {
        $navigation->content()->dissociate();
        $navigation->save();

        return $navigation;
    }

    /**
     * Get ancestors of a navigation.
     */
    public function getAncestors(Navigation $navigation): Collection
    {
        return $this->repository->findAncestors($navigation->id);
    }

    /**
     * Get descendants of a navigation.
     */
    public function getDescendants(Navigation $navigation): Collection
    {
        return $this->repository->findDescendants($navigation->id);
    }

    /**
     * Fetch all live navigations (visible and within date range).
     */
    public function getLiveNavigations(): Collection
    {
        return $this->repository->findLiveNavigations();
    }

    /**
     * Create a navigation and attach it to a model.
     */
    public function createNavigationAndAttach(NavigationDTO $dto, int $modelId, string $modelType): NavigationDTO
    {
        return DB::transaction(function () use ($dto, $modelId, $modelType) {
            $navigation = $this->repository->create($dto->toArray());

            $this->attachToModel($navigation, $modelId, $modelType);

            return NavigationDTO::fromModel($navigation);
        });
    }
}
