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
    public ?int $content_id;
    public ?string $content_type;
    public ?array $content;
    public ?string $parent_path;
    public ?string $path;
    public bool $static;

    public function __construct(
        int $id,
        string $title,
        string $slug,
        bool $authorized = false,
        ?int $parent_id = null,
        bool $visible = true,
        ?DateTime $livedate = null,
        ?DateTime $enddate = null,
        ?int $content_id = null,
        ?string $content_type = null,
        ?array $content = null,
        ?string $parent_path = null,
        ?string $path = null,
        bool $static = false
    ) {
        $this->id = $id;
        $this->title = $title;
        $this->slug = $slug;
        $this->authorized = $authorized;
        $this->parent_id = $parent_id;
        $this->visible = $visible;
        $this->livedate = $livedate;
        $this->enddate = $enddate;
        $this->content_id = $content_id;
        $this->content_type = $content_type;
        $this->content = $content;
        $this->parent_path = $parent_path;
        $this->path = $path;
        $this->static = $static;
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

    protected static function getAliasFromModelType(string $modelType): string
    {
        $modelTypes = config('navigation.model_types');
        return array_search($modelType, $modelTypes, true) ?: $modelType; // Return alias or fallback to the full namespace
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
            visible: (bool)($data['visible'] ?? true),
            livedate: isset($data['livedate']) ? new DateTime($data['livedate']) : Carbon::now(),
            enddate: isset($data['enddate']) ? new DateTime($data['enddate']) : null,
            content_id: $data['content_id'] ?? null,
            content_type: $data['content_type'] ?? null
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
            authorized: (bool) $navigation->authorized,
            parent_id: $navigation->parent_id,
            visible: (bool) $navigation->visible,
            livedate: $navigation->livedate ? new DateTime($navigation->livedate) : null,
            enddate: $navigation->enddate ? new DateTime($navigation->enddate) : null,
            content_id: $navigation->content_id,
            content_type: $navigation->content_type
                ? self::getAliasFromModelType($navigation->content_type)
                : null,
            content: $navigation->content ? $navigation->content->toArray() : null,
            parent_path: $navigation->parent_path,
            path: $navigation->path,
            static: (bool) $navigation->static
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
            'livedate' => $this->livedate ? $this->livedate->format('Y-m-d H:i:s') : null,
            'enddate' => $this->enddate ? $this->enddate->format('Y-m-d H:i:s') : null,
            'content_id' => $this->content_id,
            'content_type' => $this->content_type,
            'content' => $this->content,
            'parent_path' => $this->parent_path,
            'path' => $this->path,
            'static' => $this->static,
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
