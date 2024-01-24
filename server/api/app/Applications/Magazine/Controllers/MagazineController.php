<?php

namespace App\Applications\Magazine\Controllers;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Applications\Magazine\Services\MagazineServiceInterface;
use App\Applications\Magazine\Requests\MagazineRequest;
use App\Applications\Magazine\Requests\NewMagazineRequest;

/**
 * @property MagazineServiceInterface $magazineService
 */
class MagazineController extends Controller
{
    public function __construct(
        MagazineServiceInterface $magazineService
    ){
        $this->magazineService = $magazineService;
    }

    /**
     * Get a JSON with all the magazines
     *
     * @return Collection
     */
    public function getAll(){
        return $this->magazineService->getAll();
    }

    /**
     * Get a JSON with a magazine by ID
     *
     * @param  integer  $id
     * @return string
     */
    public function get($id){
        return $this->magazineService->get($id)->toJson();
    }

    /**
     * Store magazine and get JSON with a magazine response
     *
     * @param  NewMagazineRequest  $request
     * @return string
     */
    public function create(NewMagazineRequest $request){
        return $this->magazineService->create($request)->toJson();
    }

    /**
     * Update magazine
     *
     * @param  MagazineRequest  $request
     * @param  integer  $id
     * @return void
     */
    public function update(MagazineRequest $request, $id){
        $this->magazineService->update($request, $id);
    }

    /**
     * Delete magazine
     *
     * @return string
     */
    public function delete($id){
        return $this->magazineService->delete($id);
    }
}
