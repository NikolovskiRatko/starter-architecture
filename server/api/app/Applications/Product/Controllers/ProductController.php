<?php

namespace App\Applications\Product\Controllers;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Applications\Product\Services\ProductServiceInterface;
use App\Applications\Product\Requests\ProductRequest;
use App\Applications\Product\Requests\NewProductRequest;

/**
 * @property ProductServiceInterface $productService
 */
class ProductController extends Controller
{
    public function __construct(
        ProductServiceInterface $productService
    ){
        $this->productService = $productService;
    }

    /**
     * Get a JSON with all the products
     *
     * @return Collection
     */
    public function getAll(){
        return $this->productService->getAll();
    }

    /**
     * Get a JSON with a product by ID
     *
     * @param  integer  $id
     * @return string
     */
    public function get($id){
        return $this->productService->get($id)->toJson();
    }

    /**
     * Store product and get JSON with a product response
     *
     * @param  ProductRequest  $request
     * @return string
     */
    public function create(ProductRequest $request){
        return $this->productService->create($request)->toJson();
    }

    /**
     * Update product
     *
     * @param  ProductRequest  $request
     * @param  integer  $id
     * @return void
     */
    public function update(ProductRequest $request, $id){
        $this->productService->update($request, $id);
    }

    /**
     * Delete product
     *
     * @return string
     */
    public function delete($id){
        return $this->productService->delete($id);
    }
}
