<?php

namespace App\Applications\Magazine\Services;

use App\Applications\Magazine\Repositories\MagazineRepositoryInterface;

/**
 * @property MagazineRepositoryInterface $magazineRepository
 */
class MagazineService implements MagazineServiceInterface
{
    public function __construct(
        MagazineRepositoryInterface $magazineRepository
    ){
        $this->magazineRepository = $magazineRepository;
    }

    public function getAll(){
        return $this->magazineRepository->getAll();
    }

    public function get($id){
        return $this->magazineRepository->get($id);
    }

    public function create($request){
        $request_array = $request->all();
        $magazine = $this->magazineRepository->create($request_array);
        return $magazine;
    }

    public function update($request, $id){
        $request_array = $request->all();
        $magazine_data = $request_array;
        $magazine = $this->magazineRepository->get($id);
        $this->magazineRepository->update($magazine, $magazine_data);
    }

    public function delete($id){
        return $this->magazineRepository->delete($id);
    }
}



