<?php

namespace App\Applications\Product\Services;

use App\Applications\Product\Repositories\ProductRepositoryInterface;

/**
 * @property ProductRepositoryInterface $productRepository
 */
class ProductService implements ProductServiceInterface
{
    public function __construct(
        ProductRepositoryInterface $productRepository
    ){
        $this->productRepository = $productRepository;
    }

    public function getAll(){
        return $this->productRepository->getAll();
    }

    public function get($id){
        return $this->productRepository->get($id);
    }

    public function create($request){
        $request_array = $request->all();
        $product = $this->productRepository->create($request_array);
        return $product;
    }

    public function update($request, $id){
        $request_array = $request->all();
        $product_data = $request_array;
        $product = $this->productRepository->get($id);
        $this->productRepository->update($product, $product_data);
    }

    public function delete($id){
        return $this->productRepository->delete($id);
    }
}



