<?php

namespace App\Applications\Navigation\Controllers;

use App\Applications\Navigation\DTO\NavigationMenuDTO;
use App\Applications\Navigation\Model\NavigationMenu;
use App\Applications\Navigation\Services\NavigationMenuService;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NavigationMenuController extends Controller
{
    protected NavigationMenuService $service;

    public function __construct(NavigationMenuService $service)
    {
        $this->service = $service;
    }

    public function getAll(): JsonResponse
    {
        return response()->json($this->service->getAll());
    }

    public function get(int $id): JsonResponse
    {
        $menu = $this->service->getByIdWithItems($id);

        return $menu
            ? response()->json($menu)
            : response()->json(['error' => 'Menu not found'], 404);
    }

    public function getBySlug(string $slug): JsonResponse
    {
        $menu = $this->service->getBySlugWithItems($slug);

        return $menu
            ? response()->json($menu->toArray())
            : response()->json(['error' => 'Menu not found'], 404);
    }

    public function create(Request $request): JsonResponse
    {
        $menuDTO = NavigationMenuDTO::fromRequest($request);
        $menu = $this->service->create($menuDTO);
        return response()->json($menu, 201);
    }

    public function update(Request $request): JsonResponse
    {
        $menuId = Route::current()->parameter('id');
        $menuDTO = NavigationMenuDTO::fromRequest($request);
        $updated = $this->service->update($menuId, $menuDTO);
        return response()->json(['success' => $updated]);
    }

    public function delete(NavigationMenu $navigationMenu): JsonResponse
    {
        $deleted = $this->service->delete($navigationMenu);

        return $deleted
            ? response()->json(['success' => true])
            : response()->json(['error' => 'Deletion failed'], 500);
    }
}
