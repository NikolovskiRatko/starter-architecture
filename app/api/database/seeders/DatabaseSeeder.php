<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Applications\User\Model\User;
use App\Constants\UserPermissions;
use App\Constants\UserRoles;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Faker\Factory as Faker;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $admin = User::create([
            'first_name' => 'Admin',
            'last_name' => 'Userot',
            'email' => 'admin@example.com',
            'password' => Hash::make('password')
        ]);

        $editor = User::create([
            'first_name' => 'Editor',
            'last_name' => 'Userot',
            'email' => 'editor@example.com',
            'password' => Hash::make('password')
        ]);

        $collaborator = User::create([
            'first_name' => 'Collaborator',
            'last_name' => 'Userot',
            'email' => 'collaborator@example.com',
            'password' => Hash::make('password')
        ]);

        // Create permissions
        Permission::create(['name' => UserPermissions::READ_USERS]);
        Permission::create(['name' => UserPermissions::WRITE_USERS]);
        Permission::create(['name' => UserPermissions::DELETE_USERS]);

        // Create three roles and assign created permissions
        $roleAdmin = Role::create(['name' => UserRoles::ADMIN])->givePermissionTo(Permission::all());
        $roleEditor = Role::create(['name' => UserRoles::EDITOR])->givePermissionTo([UserPermissions::READ_USERS, UserPermissions::WRITE_USERS]);
        $roleCollaborator = Role::create(['name' => UserRoles::COLLABORATOR])->givePermissionTo(UserPermissions::READ_USERS);

        $roles = [$roleAdmin->id, $roleEditor->id, $roleCollaborator->id];

        // Adding permissions via a role
        $admin->assignRole(UserRoles::ADMIN);
        $editor->assignRole(UserRoles::EDITOR);
        $collaborator->assignRole(UserRoles::COLLABORATOR);

        $faker = Faker::create();

        // Common password for all users, hashed
        $password = Hash::make('password');

        for ($i = 0; $i < 100; $i++) {
            // Create a new user with random data
            $user = User::create([
                'first_name' => $faker->name,
                'last_name' => $faker->name,
                'email' => $faker->unique()->safeEmail,
                'password' => $password,
                // Other fields like 'first_name', 'last_name', etc., can be added here
            ]);

            // Assign a random role to the user
            $user->roles()->attach($faker->randomElement($roles));
        }
    }
}
