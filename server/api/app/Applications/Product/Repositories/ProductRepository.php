<?php

namespace App\Applications\Product\Repositories;

use App\Applications\Product\Model\Product;

/**
 * @property Product $model
 */
class ProductRepository implements IProductRepository
{
    public function __construct(
        Product $model
    ){
        $this->model = $model;
    }

    public function getAll(){
        return $this->model::all();
    }

    public function get($id){
        /** @var Product $model */
        $model = $this->model::findOrFail($id);
        return $model;
    }

    public function create($data){
        /** @var Product */
        $model = $this->model->create($data);
        return $model;
    }

    public function update($data, $id){
        /** @var Product $model */
        $model = $this->model::findOrFail($id);
        return $model->update($data);
    }

    public function delete($id){
        return $this->model
            ->where('id', $id)
            ->delete();
    }
}
