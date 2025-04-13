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
            'current_password.required' => 'users.password.messages.current_required',
            'current_password.current_password' => 'users.password.messages.current_invalid',
            'password.required' => 'users.password.messages.required',
            'password.confirmed' => 'users.password.messages.confirmed',
            'password.min' => 'users.password.messages.min',
        ];
    }
}
