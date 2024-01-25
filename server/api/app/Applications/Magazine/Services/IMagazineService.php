<?php

namespace App\Applications\Magazine\Services;

use App\Applications\Magazine\Model\Magazine;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Http\FormRequest;

/**
 * Interface IMagazineService
 * @package App\Applications\Magazine
 */

interface IMagazineService
{
    /**
     * @return Collection
     */
    public function getAll();

    /**
     * @param integer $id
     * @return Magazine
     */
    public function get($id);

    /**
     * @param array $data
     * @return Magazine
     */
    public function create($request);

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

    /**
     * @param FormRequest $request
     * @return array
     */
    public function filterAllowedProperties($request);
}
