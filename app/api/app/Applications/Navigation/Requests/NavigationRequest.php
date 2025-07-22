<?php

namespace App\Applications\Navigation\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class NavigationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Adjust if using policies
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => [
                Rule::requiredIf(fn() => $this->input('parent_id') !== null),
                'nullable',
                'string',
            ],
            'visible' => ['required', 'boolean'],
            'parent_id' => ['nullable', 'integer', 'exists:navigations,id'],
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            $slug = $this->input('slug');
            $parentId = $this->input('parent_id');

            $query = \App\Applications\Navigation\Model\Navigation::query()
                ->where(function ($q) use ($slug) {
                    if (is_null($slug)) {
                        $q->where('slug', '');
                    } else {
                        $q->where('slug', $slug);
                    }
                })
                ->where(function ($q) use ($parentId) {
                    if (is_null($parentId)) {
                        $q->whereNull('parent_id');
                    } else {
                        $q->where('parent_id', $parentId);
                    }
                });

            // Handle both route model binding and manual ID
            $routeParam = $this->route('navigation') ?? $this->route('id');
            $currentId = is_object($routeParam) ? $routeParam->id : $routeParam;

            if ($currentId) {
                $query->where('id', '!=', $currentId);
            }

            if ($query->exists()) {
                $validator->errors()->add('slug', 'The slug must be unique per parent.');
            }

            // ✅ Enforce only one navigation with parent_id = null
            if (is_null($parentId)) {
                $rootQuery = \App\Applications\Navigation\Model\Navigation::query()
                    ->whereNull('parent_id')
                    ->whereNull('deleted_at');

                if ($currentId) {
                    $rootQuery->where('id', '!=', $currentId);
                }

                if ($rootQuery->exists()) {
                    $validator->errors()->add('parent_id', 'Only one root-level navigation (with no parent) is allowed.');
                }
            }
        });
    }

    public function messages(): array
    {
        return [
            'slug.required_if' => 'The slug field is required when the navigation has a parent.',
            'slug.regex' => 'The slug must be lowercase and use hyphens only.',
        ];
    }
}
