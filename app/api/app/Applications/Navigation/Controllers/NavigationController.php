<?php

namespace App\Applications\Navigation\Controllers;

use App\Applications\Navigation\DTO\NavigationDTO;
use App\Applications\Navigation\Model\Navigation;
use App\Applications\Navigation\Services\NavigationService;
use App\Applications\Navigation\Requests\NavigationRequest;
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
        $this->authorize('view', Navigation::class);

        $navigations = $this->navigationService->getAllNavigations();
        return response()->json($navigations->map->toArray());
    }

    public function get($id)
    {
        $this->authorize('view', Navigation::class);

        $navigation = $this->navigationService->getNavigationById($id);
        return response()->json($navigation->toArray());
    }

    public function create(NavigationRequest $request)
    {
        $this->authorize('create', Navigation::class);

        $navigationDTO = NavigationDTO::fromRequest($request);
        $navigation = $this->navigationService->createNavigation($navigationDTO->toArray());
        return response()->json($navigation, 201);
    }

    public function update(Request $request)
    {
        $this->authorize('update', Navigation::class);

        $navigationId = Route::current()->parameter('id');
        $navigationDTO = NavigationDTO::fromRequest($request);
        $updatedNavigation = $this->navigationService->updateNavigation($navigationId, $navigationDTO->toArray());
        return response()->json($updatedNavigation);
    }

    public function delete(Navigation $navigation)
    {
        $this->authorize('delete', Navigation::class);

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
        $this->authorize('update', Navigation::class);

        $validated = $request->validate([
            'model_id' => 'required|integer',
            'model_type' => [
                'required',
                'string',
                function ($attribute, $value, $fail) {
                    $allowedModelTypes = array_values(config('navigation.model_types'));

                    if (!in_array($value, $allowedModelTypes, true)) {
                        $fail("The selected $attribute is invalid.");
                    }
                },
            ],
        ]);

        $navigation = $this->navigationService->attachToModel(
            $id,
            $validated['model_id'],
            $validated['model_type']
        );

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
        $this->authorize('update', Navigation::class);

        $navigation = $this->navigationService->detachModel($id);

        return response()->json($navigation->toArray());
    }

    public function getAncestors(int $id)
    {
        $this->authorize('view', Navigation::class);

        $ancestors = $this->navigationService->getAncestors($id);

        return response()->json($ancestors);
    }

    public function getDescendants(int $id)
    {
        $this->authorize('view', Navigation::class);

        $descendants = $this->navigationService->getDescendants($id);

        return response()->json($descendants);
    }
}
