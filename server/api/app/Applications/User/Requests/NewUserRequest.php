<?php

namespace App\Applications\User\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NewUserRequest extends FormRequest
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

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = [
            'first_name' => 'required|max:255|min:2',
            'last_name' => 'required|max:255|min:2',
            'email' => 'required|email|min:2|max:255|unique:users,email,'.$this->segment(3),
            'password' => 'sometimes|between:6,30|confirmed',
            'roles' => 'required|exists:roles,id',
        ];

        return $rules;
    }
    public function messages(){
        return [
            'first_name.required' => 'users.first_name.required',
            'first_name.max' => 'users.first_name.max',
            'first_name.min' => 'users.first_name.min',
            'last_name.required' => 'users.last_name.required',
            'last_name.max' => 'users.last_name.max',
            'last_name.min' => 'users.last_name.min',
            'email.required' => 'users.email.required',
            'email.email' => 'users.email.invalid',
            'email.max' => 'users.email.max',
            'email.min' => 'users.email.min',
            'email.unique' => 'users.email.unique',
            'roles.required' => 'users.roles.required',
            'roles.exists' => 'users.roles.exists',
            'password.required' => 'users.password.required',
            'password.between' => 'users.password.between',
            'password.confirmed' => 'users.password.confirmed',
        ];
    }
}
