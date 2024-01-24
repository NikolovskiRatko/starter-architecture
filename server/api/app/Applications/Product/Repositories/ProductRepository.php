<?php

namespace App\Applications\Product\Repositories;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Applications\Product\Model\Product;

/**
 * @property Product $product
 */
class ProductRepository implements ProductRepositoryInterface
{
    public function __construct(
        Product $product
    ){
        $this->product = $product;
    }

    public function getAll(){
        return $this->product::all();
    }

    public function get($id){
        /** @var Product $product */
        $product = $this->product::findOrFail($id);
        return $product;
    }

    public function create($input){
        /** @var Product */
        $product = $this->product->create($input);
        return $product;
    }

    public function update($product, $input){
        return $product->update($input);
    }

    public function delete($id){
        return $this->product
            ->where('id', $id)
            ->delete();
    }
}
