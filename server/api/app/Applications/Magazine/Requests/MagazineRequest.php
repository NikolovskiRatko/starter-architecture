<?php

namespace App\Applications\Magazine\Requests;

use App\Http\Requests\ApiFormRequest;

class MagazineRequest extends ApiFormRequest
{
    /**
     * Determine if the Magazine is authorized to make this request.
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
//            'title' => 'required',
//            'content' => 'required',
        ];

        return $rules;
    }
    public function messages(){
        return [
            'title.required' => 'Magazine name required',
            'content.required' => 'Content required',
        ];
    }
}
