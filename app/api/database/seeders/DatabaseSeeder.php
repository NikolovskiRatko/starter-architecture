<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Applications\User\Model\User;
use App\Constants\UserPermissions;
use App\Constants\UserRoles;
use App\Constants\RolePermissionsMap;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Faker\Factory as Faker;

class DatabaseSeeder extends Seeder
{
    const NUMBER_OF_FAKE_USERS = 100;
    const STATIC_USERS = [
        [
            "email" => "admin@example.com",
            "name" => "Admin",
            "role" => UserRoles::ADMIN,
            "permissions" => RolePermissionsMap::MAP[UserRoles::ADMIN]
        ],
        [
            "email" => "editor@example.com",
            "name" => "Editor",
            "role" => UserRoles::EDITOR,
            "permissions" => RolePermissionsMap::MAP[UserRoles::EDITOR]
        ],
        [
            "email" => "collaborator@example.com",
            "name" => "Collaborator",
            "role" => UserRoles::COLLABORATOR,
            "permissions" => RolePermissionsMap::MAP[UserRoles::COLLABORATOR]
        ],
    ];

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $faker = Faker::create();
        $password = Hash::make('password');

        // Create permissions
        $allPermissions = collect(RolePermissionsMap::MAP)->flatten()->unique();
        foreach ($allPermissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Create three roles and assign created permissions
        $roleIds = [];
        $roles = array_values((new \ReflectionClass(UserRoles::class))->getConstants());
        foreach ($roles as $userRole) {
            $newRole = Role::create(['name' => $userRole])
                ->givePermissionTo(RolePermissionsMap::MAP[$userRole]);
            array_push($roleIds, $newRole->id);
        };

        foreach (self::STATIC_USERS as $staticUser) {
            $newUser = User::create([
                'first_name' => $staticUser['name'],
                'last_name' => $faker->lastName(),
                'email' => $staticUser['email'],
                'password' => $password
            ]);

            $newUser->assignRole($staticUser['role']);
        }

        for ($i = 0; $i < self::NUMBER_OF_FAKE_USERS; $i++) {
            $user = User::create([
                'first_name' => $faker->firstName,
                'last_name' => $faker->lastName,
                'email' => $faker->unique()->safeEmail,
                'password' => $password,
            ]);

            // Assign a random role to the user
            $user->roles()->attach($faker->randomElement($roleIds));
        }
    }
}
