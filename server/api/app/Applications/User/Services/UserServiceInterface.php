<?php

namespace App\Applications\User\Services;

use App\Applications\User\Model\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;

/**
 * Interface UserServiceInterface
 * @package App\Applications\User
 */

interface UserServiceInterface
{
    /**
     * @return Collection
     */
    public function getAll();

    /**
     * @param integer $id
     * @return User
     */
    public function get($id);

    /**
     * @param FormRequest $request
     * @return User
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

    /**
     * @param Request $request
     * @return array
     */
    public function draw($request);

    /**
     * @param FormRequest $request
     * @return void
     */
    public function updateMyProfile($request);

    /**
     * @return string
     */
    public function getUserRoles();
}
