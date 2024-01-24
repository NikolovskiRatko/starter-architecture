<?php

namespace App\Applications\Magazine\Repositories;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Applications\Magazine\Model\Magazine;


/**
 * @property Magazine $magazine
 */
class MagazineRepository implements MagazineRepositoryInterface
{
    public function __construct(
        Magazine $magazine
    ){
        $this->magazine = $magazine;
    }

    public function getAll(){
        return $this->magazine::all();
    }

    public function get($id){
        /** @var Magazine $magazine */
        $magazine = $this->magazine::findOrFail($id);
        return $magazine;
    }

    public function create($input){
        /** @var Magazine */
        $magazine = $this->magazine->create($input);
        return $magazine;
    }

    public function update($magazine, $input){
        return $magazine->update($input);
    }

    public function delete($id){
        return $this->magazine
            ->where('id', $id)
            ->delete();
    }
}
