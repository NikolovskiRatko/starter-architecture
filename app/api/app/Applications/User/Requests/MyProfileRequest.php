<?php

namespace App\Applications\User\Requests;

use App\Http\Requests\ApiFormRequest;

class MyProfileRequest extends ApiFormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        // we will handle this with middleware
        return true;
    }

    public function rules(): array
    {
        return [
            'first_name' => 'required|string|min:2|max:255',
            'last_name'  => 'required|string|min:2|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'first_name.required' => 'users.first_name.required',
            'first_name.max'      => 'users.first_name.max',
            'first_name.min'      => 'users.first_name.min',
            'last_name.required'  => 'users.last_name.required',
            'last_name.max'       => 'users.last_name.max',
            'last_name.min'       => 'users.last_name.min',
        ];
    }
}
