<?php

namespace App\Applications\Navigation\Controllers;

use App\Applications\Navigation\DTO\NavigationDTO;
use App\Applications\Navigation\Model\Navigation;
use App\Applications\Navigation\Requests\NavigationRequest;
use App\Applications\Navigation\Services\NavigationService;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NavigationController extends Controller
{
    public function __construct(protected NavigationService $navigationService) {}

    public function index()
    {
        $this->authorize('viewAny', Navigation::class);
        $navigations = $this->navigationService->getAllNavigations();
        return response()->json($navigations->map->toArray());
    }

    public function show(Navigation $navigation)
    {
        $this->authorize('view', $navigation);
        return response()->json($navigation->toArray());
    }

    public function store(NavigationRequest $request)
    {
        $this->authorize('create', Navigation::class);
        $navigationDTO = NavigationDTO::fromRequest($request);
        $navigation = $this->navigationService->createNavigation($navigationDTO->toArray());
        return response()->json($navigation, 201);
    }

    public function update(NavigationRequest $request, Navigation $navigation)
    {
        $this->authorize('update', $navigation);
        $navigationDTO = NavigationDTO::fromRequest($request);
        $updatedNavigation = $this->navigationService->updateNavigation($navigation->id, $navigationDTO->toArray());
        return response()->json($updatedNavigation);
    }

    public function destroy(Navigation $navigation)
    {
        $this->authorize('delete', $navigation);
        $this->navigationService->deleteNavigation($navigation);
        return response()->json(null, 204);
    }

    public function attach(Navigation $navigation, Request $request): JsonResponse
    {
        $this->authorize('update', $navigation);

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

        $updated = $this->navigationService->attachToModel(
            $navigation->id,
            $validated['model_id'],
            $validated['model_type']
        );

        return response()->json($updated->toArray());
    }

    public function detach(Navigation $navigation): JsonResponse
    {
        $this->authorize('update', $navigation);

        $updated = $this->navigationService->detachModel($navigation->id);

        return response()->json($updated->toArray());
    }

    public function ancestors(Navigation $navigation)
    {
        $this->authorize('view', $navigation);
        return response()->json($this->navigationService->getAncestors($navigation->id));
    }

    public function descendants(Navigation $navigation)
    {
        $this->authorize('view', $navigation);
        return response()->json($this->navigationService->getDescendants($navigation->id));
    }
}
