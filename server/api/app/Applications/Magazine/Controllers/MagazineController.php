<?php

namespace App\Applications\Magazine\Controllers;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Applications\Magazine\Services\IMagazineService;
use App\Applications\Magazine\Requests\MagazineRequest;

/**
 * @property IMagazineService $magazineService
 */
class MagazineController extends Controller
{
    //TODO: Swagger comment blocks, formatted responses and try catch blocks with custom exceptions handling
    public function __construct(
        IMagazineService $magazineService
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
     * @param  MagazineRequest  $request
     * @return string
     */
    public function create(MagazineRequest $request){
        // TODO: Prepare formatted Response
        $data = $this->magazineService->filterAllowedProperties($request);
        return $this->magazineService->create($data)->toJson();
    }

    /**
     * Update magazine
     *
     * @param  MagazineRequest  $request
     * @param  integer  $id
     * @return void
     */
    public function update(MagazineRequest $request, $id){
        $data = $this->magazineService->filterAllowedProperties($request);
        $this->magazineService->update($data, $id);
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
