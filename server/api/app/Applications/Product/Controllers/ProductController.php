<?php

namespace App\Applications\Product\Controllers;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Applications\Product\Services\IProductService;
use App\Applications\Product\Requests\ProductRequest;

/**
 * @property IProductService $productService
 */
class ProductController extends Controller
{
    //TODO: Swagger comment blocks, formatted responses and try catch blocks with custom exceptions handling
    public function __construct(
        IProductService $productService
    ){
        $this->productService = $productService;
    }

    /**
     * Get a JSON with all the products
     *
     * @return string
     */
    public function getAll(){
        $data = $this->productService->getAll();
        return response()->json(['data' => $data]);
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
        $data = $this->productService->filterAllowedProperties($request);
        // TODO: Prepare formatted Response
        return $this->productService->create($data)->toJson();
    }

    /**
     * Update product
     *
     * @param  ProductRequest  $request
     * @param  integer  $id
     * @return void
     */
    public function update(ProductRequest $request, $id){
        $data = $this->productService->filterAllowedProperties($request);
        $this->productService->update($data, $id);
        // TODO: Prepare formatted Response
    }

    /**
     * Delete product
     *
     * @return string
     */
    public function delete($id){
        return $this->productService->delete($id);
        // TODO: Prepare formatted Response
    }
}
