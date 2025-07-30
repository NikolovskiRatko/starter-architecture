<?php

namespace App\Applications\Navigation\Repositories;

use App\Applications\Navigation\Model\Navigation;
use App\Applications\Navigation\Model\NavigationTreePath;
use Illuminate\Database\Eloquent\Collection;

/**
 * @property Navigation $navigation
 */
class NavigationRepository implements NavigationRepositoryInterface
{
    public function __construct(
        Navigation $navigation
    ) {
        $this->navigation = $navigation;
    }

    /**
     * Retrieve all navigations.
     */
    public function all(): Collection
    {
        return $this->navigation::all();
    }

    /**
     * Find a navigation by ID (with content).
     */
    public function findById(int $id): Navigation
    {
        return $this->navigation::with('content')->findOrFail($id);
    }

    /**
     * Create a new navigation.
     */
    public function create(array $data): Navigation
    {
        return $this->navigation::create($data);
    }

    /**
     * Update an existing navigation model.
     */
    public function update(Navigation $navigation, array $data): Navigation
    {
        $navigation->update($data);
        return $navigation;
    }

    /**
     * Delete the given navigation.
     */
    public function delete(Navigation $navigation): ?bool
    {
        return $navigation->delete();
    }

    /**
     * Load parent and treepath relations.
     */
    public function findWithAncestors(int $id): Navigation
    {
        return $this->navigation::with(['parent', 'treepath' => function ($query) use ($id) {
            $query->where('descendant', $id);
        }])->findOrFail($id);
    }

    /**
     * Find all ancestors of a navigation.
     */
    public function findAncestors(int $id): Collection
    {
        return $this->navigation::whereIn('id', function ($query) use ($id) {
            $query->select('ancestor')
                ->from('navigation_treepath')
                ->where('descendant', $id);
        })->get();
    }

    /**
     * Find all descendants of a navigation.
     */
    public function findDescendants(int $id): Collection
    {
        return $this->navigation::whereIn('id', function ($query) use ($id) {
            $query->select('descendant')
                ->from('navigation_treepath')
                ->where('ancestor', $id);
        })->get();
    }

    /**
     * Find all visible navigations that are currently live.
     */
    public function findLiveNavigations(): Collection
    {
        return $this->navigation::where('visible', true)
            ->where('livedate', '<=', now())
            ->where(function ($query) {
                $query->whereNull('enddate')->orWhere('enddate', '>=', now());
            })
            ->get();
    }

    /**
     * Check if a slug already exists globally.
     * (Can be adjusted if needed to include parent_id/website_id).
     */
    public function doesSlugExist(string $slug): bool
    {
        return $this->navigation::where('slug', $slug)->exists();
    }

    /**
     * Rebuild the tree path entries for the given navigation.
     *
     * Removes all ancestor and descendant relationships for this navigation
     * and rebuilds them based on its current parent hierarchy.
     *
     * @param int $navigationId
     * @return void
     */
    public function rebuildTreePaths(int $navigationId): void
    {
        // Always work with fresh data
        $navigation = $this->findById($navigationId);

        // Clean up old paths
        NavigationTreePath::where('descendant', $navigation->id)
            ->orWhere('ancestor', $navigation->id)
            ->delete();

        // Add self-reference
        NavigationTreePath::create([
            'ancestor' => $navigation->id,
            'descendant' => $navigation->id,
            'path_length' => 0,
        ]);

        // Add paths from parent
        if ($navigation->parent_id) {
            $parentPaths = NavigationTreePath::where('descendant', $navigation->parent_id)->get();

            foreach ($parentPaths as $path) {
                NavigationTreePath::create([
                    'ancestor' => $path->ancestor,
                    'descendant' => $navigation->id,
                    'path_length' => $path->path_length + 1,
                ]);
            }
        }
    }

    /**
     * Reassigns all direct children of the given navigation to a new parent.
     *
     * This is typically used when deleting a navigation to preserve its children
     * by moving them up in the hierarchy.
     *
     * @param int $oldParentId
     * @param int|null $newParentId
     * @return void
     */
    public function reassignChildren(int $oldParentId, ?int $newParentId): void
    {
        $this->navigation::where('parent_id', $oldParentId)
            ->update(['parent_id' => $newParentId]);
    }

    /**
     * Get all direct children of a navigation by parent ID.
     */
    public function getChildren(int $parentId): Collection
    {
        return $this->navigation::where('parent_id', $parentId)->get();
    }
}
