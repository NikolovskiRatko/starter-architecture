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
                Rule::unique('navigations')
                    ->ignore($this->route('id')) // exclude current record
                    ->where(function ($query) {
                        return $query->where('parent_id', $this->input('parent_id'));
                    }),
            ],
            'visible' => ['required', 'boolean'],
            'parent_id' => ['nullable', 'integer', 'exists:navigations,id'],
        ];
    }

    public function messages(): array
    {
        return [
            'slug.required_if' => 'The slug field is required when the navigation has a parent.',
            'slug.regex' => 'The slug must be lowercase and use hyphens only.',
        ];
    }
}
