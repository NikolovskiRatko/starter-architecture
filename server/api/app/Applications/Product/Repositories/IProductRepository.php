<?php

namespace App\Applications\Product\Repositories;

use App\Applications\Product\Model\Product;
use Illuminate\Database\Eloquent\Collection;

/**
 * Interface IProductRepository
 * @package App\Applications\Product
 */

interface IProductRepository
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
}
