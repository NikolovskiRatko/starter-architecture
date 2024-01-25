<?php

namespace App\Applications\Magazine\Services;

use App\Applications\Magazine\Repositories\IMagazineRepository;
//TODO:extend from base crud

/**
 * @property IMagazineRepository $magazineRepository
 */
class MagazineService implements IMagazineService
{
    const ALLOWED_PROPERTIES = ['title', 'content'];

    public function __construct(
        IMagazineRepository $magazineRepository
    ){
        $this->magazineRepository = $magazineRepository;
    }

    public function getAll(){
        return $this->magazineRepository->getAll();
    }

    public function get($id){
        return $this->magazineRepository->get($id);
    }

    public function create($data){
        return $this->magazineRepository->create($data);
    }

    public function update($data, $id){
        $this->magazineRepository->update($data, $id);
    }

    public function delete($id){
        return $this->magazineRepository->delete($id);
    }

    // Filter request data to include only allowed properties
    public function filterAllowedProperties($request)
    {
        $data = $request->toArray();
        return array_intersect_key($data, array_flip(self::ALLOWED_PROPERTIES));
    }
}



