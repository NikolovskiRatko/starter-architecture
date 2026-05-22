<?php

namespace Database\Seeders;

use App\Applications\User\Model\User;
use App\Constants\RolePermissionsMap;
use App\Constants\UserRoles;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    const NUMBER_OF_FAKE_USERS = 100;

    /**
     * Static users seeded for every fresh environment.
     *
     * Each entry supplies a `roles` array so a single user may hold multiple
     * roles (e.g. `admin-and-public@example.com` covers both access contexts).
     */
    const STATIC_USERS = [
        [
            'email' => 'super-admin@example.com',
            'name' => 'Super Admin',
            'roles' => [UserRoles::SUPER_ADMIN],
        ],
        [
            'email' => 'admin@example.com',
            'name' => 'Admin',
            'roles' => [UserRoles::ADMIN],
        ],
        [
            'email' => 'editor@example.com',
            'name' => 'Editor',
            'roles' => [UserRoles::EDITOR],
        ],
        [
            'email' => 'collaborator@example.com',
            'name' => 'Collaborator',
            'roles' => [UserRoles::COLLABORATOR],
        ],
        [
            'email' => 'public-user@example.com',
            'name' => 'Public User',
            'roles' => [UserRoles::PUBLIC_USER],
        ],
        [
            'email' => 'admin-and-public@example.com',
            'name' => 'Admin And Public',
            'roles' => [UserRoles::ADMIN, UserRoles::PUBLIC_USER],
        ],
    ];

    public function run(): void
    {
        $faker = Faker::create();
        $password = Hash::make('password');

        $allPermissions = collect(RolePermissionsMap::MAP)->flatten()->unique();
        foreach ($allPermissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        $roleNames = array_values((new \ReflectionClass(UserRoles::class))->getConstants());
        foreach ($roleNames as $userRole) {
            Role::create(['name' => $userRole])
                ->givePermissionTo(RolePermissionsMap::MAP[$userRole]);
        }

        foreach (self::STATIC_USERS as $staticUser) {
            $newUser = User::create([
                'first_name' => $staticUser['name'],
                'last_name' => $faker->lastName(),
                'email' => $staticUser['email'],
                'password' => $password,
            ]);

            // assignRole accepts an array; goes through Spatie cache invalidation
            $newUser->assignRole($staticUser['roles']);
        }

        // Faker users — random single role. Use assignRole() (not roles()->attach())
        // so Spatie's permission cache stays consistent.
        for ($i = 0; $i < self::NUMBER_OF_FAKE_USERS; $i++) {
            $user = User::create([
                'first_name' => $faker->firstName,
                'last_name' => $faker->lastName,
                'email' => $faker->unique()->safeEmail,
                'password' => $password,
            ]);

            $user->assignRole($faker->randomElement($roleNames));
        }
    }
}
