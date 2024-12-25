<?php

namespace App\Applications\User\Services;

use Illuminate\Database\Eloquent\Collection;
use App\Applications\User\Model\User;
use App\Applications\User\DTO\UserDTO;
use App\Applications\User\DTO\UserRoleDTO;
// use App\Applications\User\Data\UserRole;
use App\Applications\User\Repositories\UserRepositoryInterface;
use App\Constants\UserPermissions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 * @property UserRepositoryInterface $userRepository
 */
class UserService implements UserServiceInterface
{
    public function __construct(
        UserRepositoryInterface $userRepository
    ) {
        $this->userRepository = $userRepository;
    }

    public function getAll(): array
    {
        return $this->userRepository->getAll();
    }

    public function get($id): UserDTO
    {
        return UserDTO::fromModel(
            $this->userRepository->get($id)
        );
    }

    public function create(UserDTO $userData, string $password): UserDTO
    {
        $user = $this->userRepository->create($userData, $password);

        $roleIds = [$userData->role];
        $user->roles()->attach($roleIds);

        return UserDTO::fromModel($user);
    }

    public function update(int $userId, UserDTO $userData): UserDTO
    {
        $this->userRepository->changeRole($userId, $userData->role);
        $user = $this->userRepository->update($userId, $userData);
        return UserDTO::fromModel($user);
    }

    public function delete(int $id)
    {
        return $this->userRepository->delete($id);
    }

    public function draw(array $data): array
    {
        $data['columns'] = ['users.first_name', 'users.last_name', 'email', 'roles.id', 'users.is_disabled'];
        $data['length'] = $data['length'] ?? 10;
        $data['column'] = $data['column'] ?? 'users.first_name';
        $data['dir'] = $data['dir'] ?? 'asc';
        $data['search'] = $data['search'] ?? '';
        $data['draw'] = $data['draw'] ?? 1;

        $usersCollection = $this->userRepository->draw($data);

        $usersDTOs = $usersCollection->getCollection()->map(function ($user) {
            return UserDTO::fromModel($user);
        });

        return [
            'data' => $usersDTOs,
            'pagination' => $usersCollection->toArray()['pagination'],
        ];
    }

    public function updateMyProfile($request)
    {
        $request_array = $request->all();
        $user = $this->userRepository->get(Auth::user()->id);
        $data['first_name'] = $request_array['first_name'];
        $data['last_name'] = $request_array['last_name'];
        $data['email'] = $request_array['email'];
        $this->userRepository->update($user, $data);
        if ($request_array['password'] != null)
            $this->userRepository->setPassword($user, $request_array['password']);
    }

    public function getUserRoles(): array
    {
        $rolesCollection = $this->userRepository->getUserRoles();
        return UserRoleDTO::fromCollection($rolesCollection);
    }

    /**
     * Handle the avatar upload for a user.
     *
     * @param int $userId
     * @param Request $request
     * @param User $authenticatedUser
     * @return UserDTO
     */
    public function uploadAvatar(int $userId, Request $request, User $authenticatedUser): UserDTO
    {
        // Check if the authenticated user has permission to update another user's avatar
        $user = $this->validateUserForAvatarUpload($userId, $authenticatedUser);

        // Validate the uploaded file
        $request->validate([
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Clear the existing 'avatars' collection and upload the new avatar
        $this->userRepository->clearUserAvatars($user);
        $this->userRepository->uploadAvatar($user, $request->file('avatar'));

        // Return the updated UserDTO
        return UserDTO::fromModel($user);
    }

    /**
     * Validate if the authenticated user can upload an avatar for the given user.
     *
     * @param int $userId
     * @param User $authenticatedUser
     * @return User
     */
    protected function validateUserForAvatarUpload(int $userId, User $authenticatedUser): User
    {
        // Check if the current user is trying to update their own avatar
        if ($authenticatedUser->id !== $userId) {
            // If not, check if the user has the 'write_users' permission
            if (!$authenticatedUser->hasPermissionTo(UserPermissions::WRITE_USERS)) {
                abort(403, 'You do not have permission to update avatars for other users.');
            }

            // Find the user by the provided user ID
            return $this->userRepository->get($userId);
        }

        // Return the authenticated user if they are updating their own avatar
        return $authenticatedUser;
    }
}
