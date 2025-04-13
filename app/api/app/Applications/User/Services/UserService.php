<?php

namespace App\Applications\User\Services;

// use Illuminate\Database\Eloquent\Collection;
use App\Applications\User\Model\User;
use App\Applications\User\DTO\UserDTO;
use App\Applications\User\DTO\UserRoleDTO;
use App\Applications\User\DTO\UserPermissionDTO;
// use App\Applications\User\Data\UserRole;
use Spatie\Permission\Models\Role;
// use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Hash;
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
        $this->authorizeUserEdit();
        $user = $this->userRepository->create($userData, $password);

        $roleIds = [$userData->role];
        $user->roles()->attach($roleIds);

        return UserDTO::fromModel($user);
    }

    public function update(int $userId, UserDTO $userData): UserDTO
    {
        $this->authorizeUserEdit($userId);
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

    public function updateMyProfile(array $data): UserDTO
    {
        $user = $this->userRepository->get(Auth::id());

        $dto = UserDTO::fromMyProfileRequest($user, $data);

        $updatedUser = $this->userRepository->update($user->id, $dto);

        return UserDTO::fromModel($updatedUser);
    }

    public function getUserPermissionsAndRoles(): array
    {
        $rolesCollection = $this->userRepository->getUserRoles();
        $permissionsCollection = $this->userRepository->getUserPermissions();

        return [
            'roles' => UserRoleDTO::fromCollection($rolesCollection),
            'permissions' => UserPermissionDTO::fromCollection($permissionsCollection)
        ];
    }

    public function getUserRoleByName(string $name): ?Role
    {
        return $this->userRepository->findUserRoleByName($name);
    }

    /**
     * Handle the avatar upload for a user.
     *
     * @param int $userId
     * @param Request $request
     * @param User $user
     * @return UserDTO
     */
    public function uploadAvatar(int $userId, Request $request, User $user): UserDTO
    {
        $this->authorizeUserEdit($userId);

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
     * Validate if the authenticated user can edit or create users.
     *
     * Aborts with 403 if not authorized.
     *
     * @param int|null $userId The ID of the user being edited. Null means the authenticated user.
     * @return void
     */
    protected function authorizeUserEdit(?int $userId = null): void
    {
        $authUser = Auth::user();

        if ($userId === null || $authUser->id === $userId) {
            return;
        }

        if (!$authUser->hasPermissionTo(UserPermissions::WRITE_USERS)) {
            abort(403, 'You do not have permission to edit this user.');
        }
    }

    /**
     * {@inheritdoc}
     */
    public function updatePassword(int $userId, array $data): void
    {
        $user = $this->userRepository->get($userId);

        $user->password = Hash::make($data['password']);
        $user->save();
    }
}
