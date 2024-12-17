<?php

namespace App\Applications\Navigation\Controllers;

use App\Applications\Navigation\DTO\NavigationMenuItemDTO;
use App\Applications\Navigation\Model\NavigationMenuItem;
use App\Applications\Navigation\Services\NavigationMenuItemServiceInterface;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NavigationMenuItemController extends Controller
{
    protected NavigationMenuItemServiceInterface $service;

    public function __construct(NavigationMenuItemServiceInterface $service)
    {
        $this->service = $service;
    }

    /**
     * Get all navigation menu items.
     *
     * @return JsonResponse
     */
    public function getAll(): JsonResponse
    {
        $items = $this->service->getAll();
        return response()->json($items);
    }

    /**
     * Show a specific navigation menu item by ID.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function get(int $id): JsonResponse
    {
        $item = $this->service->getById($id);

        return $item
            ? response()->json($item)
            : response()->json(['error' => 'Item not found'], 404);
    }

    /**
     * Store a new navigation menu item.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request): JsonResponse
    {
        $request->merge([
            'order' => $this->service->getNextOrderValue($request->menu_id)
        ]);

        $menuItemDTO = NavigationMenuItemDTO::fromRequest($request);
        $item = $this->service->create($menuItemDTO);

        return response()->json($item, 201);
    }

    /**
     * Update an existing navigation menu item by ID.
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $menuItemDTO = NavigationMenuItemDTO::fromRequest($request);
        $updated = $this->service->update($id, $menuItemDTO);

        return $updated
            ? response()->json(['success' => true])
            : response()->json(['error' => 'Item not found or update failed'], 404);
    }

    /**
     * Delete a navigation menu item by ID.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function delete(int $id): JsonResponse
    {
        $deleted = $this->service->delete($id);

        return $deleted
            ? response()->json(['success' => true])
            : response()->json(['error' => 'Item not found or deletion failed'], 404);
    }

    /**
     * Reorder a navigation menu item.
     *
     * @param Request $request
     * @param int $menuId
     * @return JsonResponse
     */
    public function reorder(Request $request, int $menuId): JsonResponse
    {
        $request->validate([
            'item_id' => 'required|integer|exists:navigation_menu_items,id',
            'order' => 'required|integer|min:1'
        ]);

        try {
            $this->service->reorderItem(
                $menuId,
                $request->input('item_id'),
                $request->input('order')
            );

            return response()->json(['success' => true]);
        } catch (Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 400);
        }
    }
}
