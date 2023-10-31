<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $admin = User::create([
            'name' => 'admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('password')
        ]);

        $editor = User::create([
            'name' => 'editor',
            'email' => 'editor@example.com',
            'password' => Hash::make('password')
        ]);

        $collaborator = User::create([
            'name' => 'collaborator',
            'email' => 'collaborator@example.com',
            'password' => Hash::make('password')
        ]);

        // create permissions
        Permission::create(['name' => 'read_users']);
        Permission::create(['name' => 'write_users']);
        Permission::create(['name' => 'delete_users']);

        // create roles and assign created permissions
        Role::create(['name' => 'collaborator'])->givePermissionTo('read_users');
        Role::create(['name' => 'editor'])->givePermissionTo(['read_users', 'write_users']);
        Role::create(['name' => 'admin'])->givePermissionTo(Permission::all());

        // Adding permissions via a role
        $admin->assignRole('admin');
        $editor->assignRole('editor');
        $collaborator->assignRole('collaborator');
    }
}
