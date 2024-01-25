<?php

namespace App\Applications\Magazine\Repositories;

use App\Applications\Magazine\Model\Magazine;


/**
 * @property Magazine $model
 */
class MagazineRepository implements IMagazineRepository
{
    public function __construct(
        Magazine $model
    ){
        $this->model = $model;
    }

    public function getAll(){
        return $this->model::all();
    }

    public function get($id){
        /** @var Magazine $model */
        $model = $this->model::findOrFail($id);
        return $model;
    }

    public function create($data){
        /** @var Magazine */
        $model = $this->model->create($data);
        return $model;
    }

    public function update($data, $id){
        $model = $this->model::findOrFail($id);
        return $model->update($data);
    }

    public function delete($id){
        return $this->model
            ->where('id', $id)
            ->delete();
    }
}
