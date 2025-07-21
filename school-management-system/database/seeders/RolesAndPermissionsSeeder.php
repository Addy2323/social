<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // create permissions
        Permission::create(['name' => 'manage everything']);

        // create roles and assign created permissions
        $role = Role::create(['name' => 'Admin']);
        $role->givePermissionTo('manage everything');

        Role::create(['name' => 'Teacher']);
        Role::create(['name' => 'Student']);
        Role::create(['name' => 'Parent']);
    }
}
