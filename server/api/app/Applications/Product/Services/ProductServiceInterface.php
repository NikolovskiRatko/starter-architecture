<?php

namespace App\Applications\Product\Services;

use App\Applications\Product\Model\Product;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;

/**
 * Interface ProductServiceInterface
 * @package App\Applications\Product
 */

interface ProductServiceInterface
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
     * @param FormRequest $request
     * @return Product
     */
    public function create($request);

    /**
     * @param FormRequest $request
     * @param integer $id
     * @return void
     */
    public function update($request, $id);

    /**
     * @param integer $id
     * @return boolean
     */
    public function delete($id);
}
