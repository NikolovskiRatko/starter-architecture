<?php

namespace App\Applications\Product\Services;

use App\Applications\Product\Model\Product;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Http\FormRequest;

/**
 * Interface IProductService
 * @package App\Applications\Product
 */

interface IProductService
{
    /**
     * @return Collection
     */
    public function getAll();

    /**
     * @param integer $id
     * @return Product
     */
    public function get($id);

    /**
     * @param array $data
     * @return Product
     */
    public function create($data);

    /**
     * @param array $data
     * @param integer $id
     * @return void
     */
    public function update($data, $id);

    /**
     * @param integer $id
     * @return boolean
     */
    public function delete($id);

    /**
     * @param FormRequest $request
     * @return array
     */
    public function filterAllowedProperties($request);
}
