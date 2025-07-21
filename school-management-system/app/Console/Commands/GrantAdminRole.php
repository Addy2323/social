<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;

class GrantAdminRole extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'user:grant-admin {email}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Grant Admin role to a user';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $email = $this->argument('email');
        $user = User::where('email', $email)->first();

        if (!$user) {
            $this->error('User with email ' . $email . ' not found.');
            return 1;
        }

        if ($user->role === 'admin') {
            $this->info('User ' . $email . ' already has the admin role.');
            return 0;
        }

        $user->role = 'admin';
        $user->save();
        $this->info('Admin role granted to user ' . $email);
        return 0;
    }
}
