<?php

namespace App\Applications\User\Services;

use App\Applications\User\Repositories\UserRepositoryInterface;

use Illuminate\Support\Facades\Auth;

/**
 * @property UserRepositoryInterface $userRepository
 */
class UserService implements UserServiceInterface
{
    public function __construct(
        UserRepositoryInterface $userRepository
    ){
        $this->userRepository = $userRepository;
    }

    public function getAll(){
        return $this->userRepository->getAll();
    }

    public function get($id){
        return $this->userRepository->get($id);
    }

    public function create($request){
        $request_array = $request->all();
        if(empty($request_array['password']))
            unset($request_array['password']);
        $user = $this->userRepository->create($request_array);
        if(!empty($request_array['password']))
            $this->userRepository->setPassword($user, $request_array['password']);
        $this->userRepository->changeRoles($user->id, $request_array['roles']);

        return $user;
    }

    public function update($request, $id){
        $request_array = $request->all();
        $user_data = $request_array;
        unset($user_data['password']);
        $user = $this->userRepository->get($id);
        $this->userRepository->update($user, $user_data);
        if(!empty($request_array['password']) || $request_array['password'] != null)
            $this->userRepository->setPassword($user, $request_array['password']);
        $this->userRepository->changeRole($id, $request_array['role']);
    }

    public function delete($id){
        return $this->userRepository->delete($id);
    }

    public function draw($request){
        $data['columns'] = Array('users.first_name', 'users.last_name', 'email', 'roles.id', 'users.is_disabled');
        $data['length'] = $request->input('length');
        $data['column'] = $request->input('column'); //Index
        $data['dir'] = $request->input('dir');
        $data['search'] = $request->input('search');
        $data['draw'] = $request->input('draw');

        return $this->userRepository->draw($data);
    }

    public function updateMyProfile($request){
        $request_array = $request->all();
        $user = $this->userRepository->get(Auth::user()->id);
        $data['first_name'] = $request_array['first_name'];
        $data['last_name'] = $request_array['last_name'];
        $data['email'] = $request_array['email'];
        $this->userRepository->update($user, $data);
        if($request_array['password']!=null)
            $this->userRepository->setPassword($user, $request_array['password']);
    }

    public function getUserRoles(){
        return $this->userRepository->getUserRoles()->toJson();
    }
}



