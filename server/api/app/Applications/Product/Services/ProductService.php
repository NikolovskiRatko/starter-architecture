<?php

namespace App\Applications\Product\Services;

use App\Applications\Product\Repositories\IProductRepository;
//TODO:extend from base crud
/**
 * @property IProductRepository $productRepository
 */
class ProductService implements IProductService
{
    const ALLOWED_PROPERTIES = ['name', 'description'];

    public function __construct(
        IProductRepository $productRepository
    ){
        $this->productRepository = $productRepository;
    }

    public function getAll(){
        return $this->productRepository->getAll();
    }

    public function get($id){
        return $this->productRepository->get($id, self::ALLOWED_PROPERTIES);
    }

    public function create($data){
        return $this->productRepository->create($data);
    }

    public function update($data, $id){
        $this->productRepository->update($data, $id);
    }

    public function delete($id){
        return $this->productRepository->delete($id);
    }

    // Filter request data to include only allowed properties
    public function filterAllowedProperties($request)
    {
        $data = $request->toArray();
        $data = array_intersect_key($data, array_flip(self::ALLOWED_PROPERTIES));
        $data['expiration_date'] = now()->addDay()->setHour(23)->setMinute(59)->setSecond(59);
        return $data;
    }
}



