<?php

namespace App\Applications\User\Requests;

use App\Http\Requests\ApiFormRequest;

class UpdatePasswordRequest extends ApiFormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'current_password' => ['required', 'current_password'],
            'password' => ['required', 'confirmed', 'min:8'],
        ];
    }

    public function messages(): array
    {
        return [
            'current_password.required' => 'users.current_password.required',
            'current_password.current_password' => 'users.current_password.invalid',
            'password.required' => 'users.password.required',
            'password.confirmed' => 'users.password.confirmed',
            'password.min' => 'users.password.min',
        ];
    }
}
