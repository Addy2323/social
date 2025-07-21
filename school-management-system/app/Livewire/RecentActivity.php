<?php

namespace App\Livewire;

use App\Models\User;
use Livewire\Component;

class RecentActivity extends Component
{
    public function render()
    {
        $activities = User::latest()->take(5)->get();

        return view('livewire.recent-activity', [
            'activities' => $activities,
        ]);
    }
}
