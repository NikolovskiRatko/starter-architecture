<?php

namespace App\Applications\User\Requests;

use App\Http\Requests\ApiFormRequest;

class NewUserRequest extends ApiFormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        // Authorization handled via middleware (e.g., role checks)
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'first_name' => 'required|string|min:2|max:255',
            'last_name' => 'required|string|min:2|max:255',
            'email' => 'required|email|min:2|max:255|unique:users,email',
            'password' => 'required|string|between:6,30|confirmed',
            'role' => 'required|exists:roles,id',
        ];
    }

    /**
     * Custom validation messages.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'first_name.required' => 'users.validation.first_name.required',
            'first_name.max' => 'users.validation.first_name.max',
            'first_name.min' => 'users.validation.first_name.min',

            'last_name.required' => 'users.validation.last_name.required',
            'last_name.max' => 'users.validation.last_name.max',
            'last_name.min' => 'users.validation.last_name.min',

            'email.required' => 'users.validation.email.required',
            'email.email' => 'users.validation.email.invalid',
            'email.max' => 'users.validation.email.max',
            'email.min' => 'users.validation.email.min',
            'email.unique' => 'users.validation.email.unique',

            'roles.required' => 'users.validation.roles.required',
            'roles.exists' => 'users.validation.roles.exists',

            'password.required' => 'users.validation.password.required',
            'password.between' => 'users.validation.password.between',
            'password.confirmed' => 'users.validation.password.confirmed',
        ];
    }
}
