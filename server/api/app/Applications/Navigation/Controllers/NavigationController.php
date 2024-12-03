<?php

namespace App\Applications\Navigation\Controllers;

use App\Applications\Navigation\DTO\NavigationDTO;
use App\Applications\Navigation\Model\Navigation;
use App\Applications\Navigation\Services\NavigationService;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
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
        return response()->json($navigations->map->toArray());
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

    /**
     * Attach a navigation entry to another model (morph it).
     *
     * @param int $id
     * @param Request $request
     * @return JsonResponse
     */
    public function attachToModel(int $id, Request $request)
    {
        $validated = $request->validate([
            'model_id' => 'required|integer',
            'model_type' => [
                'required',
                'string',
                function ($attribute, $value, $fail) {
                    $allowedModelTypes = array_keys(config('navigation.model_types'));

                    if (!in_array($value, $allowedModelTypes, true)) {
                        $fail("The selected $attribute is invalid.");
                    }
                },
            ],
        ]);

        // Convert alias to the full namespace
        $modelType = config('navigation.model_types')[$validated['model_type']];

        $navigation = $this->navigationService->attachToModel($id, $validated['model_id'], $modelType);

        return response()->json($navigation->toArray());
    }

    /**
     * Detach the morphable model from a navigation entry.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function detachModel(int $id): JsonResponse
    {
        $navigation = $this->navigationService->detachModel($id);

        return response()->json($navigation->toArray());
    }

    public function getAncestors(int $id)
    {
        $ancestors = $this->navigationService->getAncestors($id);
        return response()->json($ancestors);
    }

    public function getDescendants(int $id)
    {
        $descendants = $this->navigationService->getDescendants($id);
        return response()->json($descendants);
    }
}
