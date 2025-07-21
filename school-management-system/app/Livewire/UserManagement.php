<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\User;
use Spatie\Permission\Models\Role;

class UserManagement extends Component
{
    public $users;
    public $roles;

    public function mount()
    {
        $this->users = User::with('roles')->get();
        $this->roles = Role::all();
    }

    public function updateUserRole($userId, $roleName)
    {
        $user = User::find($userId);
        if ($user) {
            $user->syncRoles([$roleName]);
            $this->users = User::with('roles')->get(); // Refresh the user list
            $this->dispatch('role-updated');
        }
    }

    public function render()
    {
        return view('livewire.user-management');
    }
}
