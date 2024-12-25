<?php

namespace App\Applications\Navigation\Services;

use App\Applications\Navigation\DTO\NavigationDTO;
use App\Applications\Navigation\Repositories\NavigationRepositoryInterface;
use App\Applications\Navigation\Model\Navigation;
use Exception;
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
     * Retrieve all navigations as DTOs.
     *
     * @return Collection|NavigationDTO[]
     */
    public function getAllNavigations(): Collection
    {
        $navigations = $this->repository->all();

        // Transform each navigation into a DTO
        return new Collection(NavigationDTO::fromCollection($navigations));
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
     * @param Navigation $navigation
     * @return bool|null
     * @throws Exception
     */
    public function deleteNavigation(Navigation $navigation): ?bool
    {
        return $this->repository->delete($navigation);
    }

    /**
     * Attach a navigation entry to another model (morph it).
     *
     * @param int $navigationId
     * @param int $modelId
     * @param string $modelType
     * @return Navigation
     * @throws Exception
     */
    public function attachToModel(int $navigationId, int $modelId, string $modelType): Navigation
    {
        // Fetch the navigation entry
        $navigation = $this->repository->findById($navigationId);

        if (!$navigation) {
            throw new Exception("Navigation entry not found");
        }

        // Dynamically resolve and find the model instance
        if (!class_exists($modelType)) {
            throw new Exception("Invalid model type: {$modelType}");
        }

        $model = $modelType::findOrFail($modelId);

        // Attach the morphable model
        $navigation->content()->associate($model);
        $navigation->save();

        return $navigation;
    }

    /**
     * Detach the morphable model from a navigation entry.
     *
     * @param int $navigationId
     * @return Navigation
     * @throws Exception
     */
    public function detachModel(int $navigationId): Navigation
    {
        $navigation = $this->repository->findById($navigationId);

        if (!$navigation) {
            throw new Exception("Navigation entry not found");
        }

        // Detach the morphable model
        $navigation->content()->dissociate();
        $navigation->save();

        return $navigation;
    }

    public function getAncestors(int $id): Collection
    {
        $ancestors = $this->repository->findAncestors($id);

        $ancestors->each(function ($ancestor) {
            return NavigationDTO::fromModel($ancestor);
        });

        return $ancestors;
    }

    public function getDescendants(int $id): Collection
    {
        $descendants = $this->repository->findDescendants($id);

        $descendants->each(function ($descendant) {
            return NavigationDTO::fromModel($descendant);
        });

        return $descendants;
    }

    /**
     * Fetch all visible navigations that are currently live.
     *
     * @return array
     */
    public function getLiveNavigations(): array
    {
        $navigations = $this->repository->findLiveNavigations();

        return NavigationDTO::fromCollection($navigations);
    }

    public function createNavigationAndAttach(NavigationDTO $navigationDTO, int $modelId, string $modelType): NavigationDTO
    {
        $navigation = $this->repository->create($navigationDTO->toArray());

        $this->attachToModel($navigation->id, $modelId, $modelType);

        return NavigationDTO::fromModel($navigation);
    }
}
