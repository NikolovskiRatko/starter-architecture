<?php

namespace App\Applications\Navigation\DTO;

use App\Applications\Navigation\Model\Navigation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Carbon\Carbon;
use DateTime;

class NavigationDTO
{
    public int $id;
    public string $title;
    public string $slug;
    public bool $authorized;
    public ?int $parent_id;
    public bool $visible;
    public ?DateTime $livedate;
    public ?DateTime $enddate;
    public ?int $model_id;
    public ?string $model_type;

    public function __construct(
        int $id,
        string $title,
        string $slug,
        bool $authorized = false,
        ?int $parent_id = null,
        bool $visible = true,
        ?DateTime $livedate = null,
        ?DateTime $enddate = null,
        ?int $model_id = null,
        ?string $model_type = null
    ) {
        $this->id = $id;
        $this->title = $title;
        $this->slug = $slug;
        $this->authorized = $authorized;
        $this->parent_id = $parent_id;
        $this->visible = $visible;
        $this->livedate = $livedate;
        $this->enddate = $enddate;
        $this->model_id = $model_id;
        $this->model_type = $model_type;
    }

    /**
     * Validate navigation data.
     *
     * @param array $data
     * @throws ValidationException
     */
    protected static function validate(array $data): void
    {
        $rules = [
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:navigations,slug,' . ($data['id'] ?? '0'),
            'authorized' => 'boolean',
            'parent_id' => 'nullable|integer|exists:navigations,id',
            'visible' => 'boolean',
            'livedate' => 'nullable|date',
            'enddate' => 'nullable|date|after_or_equal:livedate',
        ];

        Validator::make($data, $rules)->validate();
    }

    /**
     * Validate and initialize NavigationDTO from request data.
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
            title: $data['title'],
            slug: $data['slug'],
            authorized: $data['authorized'] ?? false,
            parent_id: $data['parent_id'] ?? null,
            visible: $data['visible'] ?? true,
            livedate: isset($data['livedate']) ? new DateTime($data['livedate']) : Carbon::now(),
            enddate: isset($data['enddate']) ? new DateTime($data['enddate']) : null,
            model_id: $data['model_id'] ?? null,
            model_type: $data['model_type'] ?? null
        );
    }

    /**
     * Create NavigationDTO from an existing model.
     *
     * @param Navigation $navigation
     * @return static
     */
    public static function fromModel(Navigation $navigation): self
    {
        return new self(
            id: $navigation->id,
            title: $navigation->title,
            slug: $navigation->slug,
            authorized: $navigation->authorized,
            parent_id: $navigation->parent_id,
            visible: $navigation->visible,
            livedate: $navigation->livedate,
            enddate: $navigation->enddate,
            model_id: $navigation->model_id,
            model_type: $navigation->model_type
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
            'title' => $this->title,
            'slug' => $this->slug,
            'authorized' => $this->authorized,
            'parent_id' => $this->parent_id,
            'visible' => $this->visible,
            'livedate' => $this->livedate?->format('Y-m-d'),
            'enddate' => $this->enddate?->format('Y-m-d'),
            'model_id' => $this->model_id,
            'model_type' => $this->model_type,
        ];
    }

    /**
     * Convert a collection of Navigation models to an array of DTOs.
     *
     * @param iterable $navigations
     * @return array
     */
    public static function fromCollection(iterable $navigations): array
    {
        return array_map(function (Navigation $navigation) {
            return self::fromModel($navigation);
        }, $navigations->all());
    }
}
