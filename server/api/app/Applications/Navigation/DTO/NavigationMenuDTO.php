<?php

namespace App\Applications\Navigation\DTO;

use App\Applications\Navigation\Model\NavigationMenu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class NavigationMenuDTO
{
    public int $id;
    public string $name;
    public ?string $description;
    public array $items;

    public function __construct(
        int $id,
        string $name,
        ?string $description = null,
        array $items = []
    ) {
        $this->id = $id;
        $this->name = $name;
        $this->description = $description;
        $this->items = $items;
    }

    /**
     * Validate navigation menu data.
     *
     * @param array $data
     * @throws ValidationException
     */
    protected static function validate(array $data): void
    {
        $rules = [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:500',
        ];

        Validator::make($data, $rules)->validate();
    }

    /**
     * Validate and initialize NavigationMenuDTO from request data.
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
            name: $data['name'],
            description: $data['description'] ?? null
        );
    }

    /**
     * Create NavigationMenuDTO from an existing model.
     *
     * @param NavigationMenu $navigationMenu
     * @return static
     */
    public static function fromModel(NavigationMenu $navigationMenu): self
    {
        return new self(
            id: $navigationMenu->id,
            name: $navigationMenu->name,
            description: $navigationMenu->description,
            items: NavigationMenuItemDTO::fromCollection($navigationMenu->items ?? [])
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
            'name' => $this->name,
            'description' => $this->description,
        ];
    }

    /**
     * Convert a collection of NavigationMenu models to an array of DTOs.
     *
     * @param iterable $navigationMenus
     * @return array
     */
    public static function fromCollection(iterable $navigationMenus): array
    {
        return array_map(function (NavigationMenu $navigationMenu) {
            return self::fromModel($navigationMenu);
        }, $navigationMenus->all());
    }
}
