<?php

namespace App\Applications\Magazine\Repositories;

use App\Applications\Magazine\Model\Magazine;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;

/**
 * Interface IMagazineRepository
 * @package App\Applications\Magazine
 */

interface IMagazineRepository
{
    /**
     * @return Collection
     */
    public function getAll();

    /**
     * @param integer $id
     * @param array $properties
     * @return Magazine
     */
    public function get($id, $properties);

    /**
     * @param array $data
     * @return Magazine
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
