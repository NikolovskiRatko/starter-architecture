<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Applications\Navigation\Services\NavigationMenuService;
use App\Applications\Navigation\Services\NavigationService;
use Illuminate\Http\JsonResponse;

class NavigationController extends Controller
{
    protected $navigationMenuService;
    protected $navigationService;

    public function __construct(NavigationMenuService $navigationMenuService, NavigationService $navigationService)
    {
        $this->navigationMenuService = $navigationMenuService;
        $this->navigationService = $navigationService;
    }

    /**
     * Get a navigation menu with its items by slug.
     *
     * @param string $slug
     * @return JsonResponse
     */
    public function get(string $slug): JsonResponse
    {
        $menu = $this->navigationMenuService->getBySlugWithItems($slug);

        return $menu
            ? response()->json($menu)
            : response()->json(['error' => 'Menu not found'], 404);
    }

    /**
     * Fetch all visible navigations that are currently live.
     *
     * @return JsonResponse
     */
    public function getLiveNavigations(): JsonResponse
    {
        $navigations = $this->navigationService->getLiveNavigations();

        return response()->json($navigations);
    }
}
