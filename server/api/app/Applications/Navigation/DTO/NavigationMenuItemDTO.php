<?php

namespace App\Applications\Navigation\DTO;

use App\Applications\Navigation\Model\NavigationMenuItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class NavigationMenuItemDTO
{
    public int $id;
    public ?int $navigation_id;
    public ?array $navigation;
    public ?string $external_url;
    public int $menu_id;
    public string $label;
    public int $order;

    public function __construct(
        int $id,
        ?int $navigation_id = null,
        ?array $navigation = null,
        ?string $external_url = null,
        int $menu_id,
        string $label,
        int $order
    ) {
        $this->id = $id;
        $this->navigation_id = $navigation_id;
        $this->navigation = $navigation;
        $this->external_url = $external_url;
        $this->menu_id = $menu_id;
        $this->label = $label;
        $this->order = $order;
    }

    /**
     * Validate navigation menu item data.
     *
     * @param array $data
     * @throws ValidationException
     */
    protected static function validate(array $data): void
    {
        $rules = [
            'navigation_id' => 'nullable|integer|exists:navigations,id|required_without_all:external_url',
            'external_url' => 'nullable|string|url|max:255|required_without_all:navigation_id',
            'menu_id' => 'required|integer|exists:navigation_menus,id',
            'label' => 'required|string|max:255',
            'order' => 'required|integer|min:1',
        ];

        // Create the validator instance
        $validator = Validator::make($data, $rules);

        // Add custom rule to ensure only one of navigation_id or external_url is set
        $validator->after(function ($validator) use ($data) {
            if (!empty($data['navigation_id']) && !empty($data['external_url'])) {
                $validator->errors()->add('navigation_id', 'Only one of navigation_id or external_url should be set.');
                $validator->errors()->add('external_url', 'Only one of navigation_id or external_url should be set.');
            }
        });

        // Run the validation
        $validator->validate();
    }

    /**
     * Validate and initialize NavigationMenuItemDTO from request data.
     *
     * @param Request $request
     * @return static
     * @throws ValidationException
     */
    public static function fromRequest(Request $request): self
    {
        $data = $request->all();
        self::validate($data);

        return new self(
            id: $data['id'] ?? 0,
            navigation_id: $data['navigation_id'] ?? null,
            navigation: null,
            external_url: $data['external_url'] ?? null,
            menu_id: $data['menu_id'],
            label: $data['label'],
            order: $data['order']
        );
    }

    /**
     * Create NavigationMenuItemDTO from an existing model.
     *
     * @param NavigationMenuItem $item
     * @return static
     */
    public static function fromModel(NavigationMenuItem $item): self
    {
        return new self(
            id: $item->id,
            navigation_id: $item->navigation_id,
            navigation: $item->navigation ? NavigationDTO::fromModel($item->navigation)->toArray() : null,
            external_url: $item->external_url,
            menu_id: $item->menu_id,
            label: $item->label,
            order: $item->order
        );
    }

    /**
     * Serialize the DTO to an array for JSON representation.
     *
     * @return array
     */
    public function jsonSerialize(): array
    {
        return $this->toArray();
    }

    /**
     * Convert the DTO to an array.
     *
     * @return array
     */
    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'navigation_id' => $this->navigation_id,
            'navigation' => $this->navigation,
            'external_url' => $this->external_url,
            'menu_id' => $this->menu_id,
            'label' => $this->label,
            'order' => $this->order,
        ];
    }

    /**
     * Convert a collection of NavigationMenuItem models to an array of DTOs.
     *
     * @param iterable $items
     * @return array
     */
    public static function fromCollection(iterable $items): array
    {
        return array_map(function (NavigationMenuItem $item) {
            return self::fromModel($item);
        }, $items->all());
    }
}
