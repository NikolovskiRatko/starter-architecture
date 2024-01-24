<?php

namespace App\Applications\Magazine\Repositories;

use App\Applications\Magazine\Model\Magazine;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;

/**
 * Interface MagazineRepositoryInterface
 * @package App\Applications\Magazine
 */

interface MagazineRepositoryInterface
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
     * @param FormRequest $request
     * @return Magazine
     */
    public function create($request);

    /**
     * @param FormRequest $request
     * @param integer $id
     * @return void
     */
    public function update($request, $id);

    /**
     * @param integer $id
     * @return boolean
     */
    public function delete($id);
}
