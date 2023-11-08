<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Applications\User\Model\User;
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
            'last_name' => 'User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password')
        ]);

        $editor = User::create([
            'first_name' => 'Editor',
            'last_name' => 'User',
            'email' => 'editor@example.com',
            'password' => Hash::make('password')
        ]);

        $collaborator = User::create([
            'first_name' => 'Collaborator',
            'last_name' => 'User',
            'email' => 'collaborator@example.com',
            'password' => Hash::make('password')
        ]);

        // Create permissions
        Permission::create(['name' => 'read_users']);
        Permission::create(['name' => 'write_users']);
        Permission::create(['name' => 'delete_users']);

        // Create three roles and assign created permissions
        $roleAdmin = Role::create(['name' => 'admin'])->givePermissionTo(Permission::all());
        $roleEditor = Role::create(['name' => 'editor'])->givePermissionTo(['read_users', 'write_users']);
        $roleCollaborator = Role::create(['name' => 'collaborator'])->givePermissionTo('read_users');

        $roles = [$roleAdmin->id, $roleEditor->id, $roleCollaborator->id];

        // Adding permissions via a role
        $admin->assignRole('admin');
        $editor->assignRole('editor');
        $collaborator->assignRole('collaborator');

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
