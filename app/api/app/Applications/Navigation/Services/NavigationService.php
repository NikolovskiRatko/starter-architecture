<?php

namespace App\Applications\Navigation\Services;

use App\Applications\Navigation\DTO\NavigationDTO;
use App\Applications\Navigation\Repositories\NavigationRepositoryInterface;
use App\Applications\Navigation\Model\Navigation;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
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

    protected function computePath(Navigation $navigation): string
    {
        if (!$navigation->parent_id) {
            return '/'; // Root navigation
        }

        $segments = [];

        $current = $navigation;

        while ($current && $current->parent_id) {
            $segments[] = $current->slug;
            $current = $this->repository->findById($current->parent_id);
        }

        $segments = array_reverse($segments);
        return '/' . implode('/', $segments);
    }

    /**
     * Create a new navigation.
     */
    public function createNavigation(array $data): Navigation
    {
        // Temporarily create the model in memory to assign path before saving
        $navigation = new Navigation($data);

        // Compute path
        $computedPath = $this->computePath($navigation);
        $navigation->path = $computedPath;

        $this->repository->save($navigation);

        return $navigation;
    }

    /**
     * Update an existing navigation.
     * @throws ValidationException
     */
    public function updateNavigation(Navigation $navigation, array $data): Navigation
    {
        $originalParentId = $navigation->parent_id;
        $originalSlug = $navigation->slug;

        // Detect parent change
        $parentChanged = array_key_exists('parent_id', $data) && $data['parent_id'] !== $originalParentId;

        // Detect slug change
        $slugChanged = array_key_exists('slug', $data) && $data['slug'] !== $originalSlug;

        // Prevent circular reference
        if ($parentChanged) {
            $descendants = $this->repository->findDescendants($navigation->id)->pluck('id')->all();

            if (in_array($data['parent_id'], $descendants)) {
                throw ValidationException::withMessages([
                    'parent_id' => 'Cannot assign a descendant as parent. This would create a circular reference.',
                ]);
            }
        }

        // Perform update
        $navigation->update($data);

        // If parent or slug changed, rebuild tree and update paths
        if ($parentChanged || $slugChanged) {
            // Rebuild tree for this navigation
            $this->repository->rebuildTreePaths($navigation->id);

            // Recompute path
            $navigation->path = $this->computePath($navigation);
            $this->repository->save($navigation);

            // Update descendants
            $descendants = $this->repository->findDescendants($navigation->id);
            foreach ($descendants as $descendant) {
                $descendant->path = $this->computePath($descendant);
                $this->repository->save($descendant);
            }
        }

        return $navigation;
    }

    /**
     * Delete a navigation.
     * @throws ValidationException
     */
    public function deleteNavigation(Navigation $navigation): ?bool
    {
        // Step 1: Get current children before they get reassigned
        $children = $this->repository->getChildren($navigation->id);

        // Step 2: Validate that no child will conflict with an existing sibling under new parent
        foreach ($children as $child) {
            $conflict = $this->repository->doesSlugExistForParent(
                $child->slug,
                $navigation->parent_id,
                $child->id // exclude self
            );

            if ($conflict) {
                throw ValidationException::withMessages([
                    'slug' => "Cannot delete navigation. Child '{$child->slug}' would conflict with an existing navigation under the parent.",
                ]);
            }
        }

        // Step 3: Reassign to the deleted navigation's parent
        $this->repository->reassignChildren($navigation->id, $navigation->parent_id);

        // Step 4: Delete the navigation
        $result = $this->repository->delete($navigation);

        // Step 5: Rebuild tree paths for previously collected children
        if ($result) {
            foreach ($children as $child) {
                $this->repository->rebuildTreePaths($child->id);
            }
        }

        return $result;
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

    public function findByPath(string $path): Navigation
    {
        return $this->repository->findByPath($path);
    }
}
