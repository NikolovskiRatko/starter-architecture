<?php

namespace App\Applications\Navigation\Controllers;

use App\Applications\Navigation\DTO\NavigationDTO;
use App\Applications\Navigation\Model\Navigation;
use App\Applications\Navigation\Services\NavigationService;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

class NavigationController extends Controller
{
    protected $navigationService;

    public function __construct(NavigationService $navigationService)
    {
        $this->navigationService = $navigationService;
    }

    public function getAll()
    {
        $navigations = $this->navigationService->getAllNavigations();
        return response()->json($navigations);
    }

    public function get($id)
    {
        $navigation = $this->navigationService->getNavigationById($id);
        return response()->json($navigation->toArray());
    }

    public function create(Request $request)
    {
        $navigationDTO = NavigationDTO::fromRequest($request);
        $navigation = $this->navigationService->createNavigation($navigationDTO->toArray());
        return response()->json($navigation, 201);
    }

    public function update(Request $request)
    {
        $navigationId = Route::current()->parameter('id');
        $navigationDTO = NavigationDTO::fromRequest($request);
        $updatedNavigation = $this->navigationService->updateNavigation($navigationId, $navigationDTO->toArray());
        return response()->json($updatedNavigation);
    }

    public function delete(Navigation $navigation)
    {
        $this->navigationService->deleteNavigation($navigation);
        return response()->json(null, 204);
    }
}
