<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Applications\Navigation\Services\NavigationMenuService;
use Illuminate\Http\JsonResponse;

class NavigationController extends Controller
{
    protected $navigationMenuService;

    public function __construct(NavigationMenuService $navigationMenuService)
    {
        $this->navigationMenuService = $navigationMenuService;
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
}
