<?php

namespace App\Applications\Product\Requests;

use App\Http\Requests\ApiFormRequest;

class ProductRequest extends ApiFormRequest
{
    /**
     * Determine if the Product is authorized to make this request.
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
            'name' => 'required',
            'description' => 'required',
            'expiration_time' => 'required|date',
        ];

        return $rules;
    }
    public function messages(){
        return [
            'name.required' => 'Product name required',
            'description.required' => 'Description required',
            'expiration_time.required' => 'Expiration date required',
            'expiration_time.date' => 'Value must be date',
        ];
    }
}
