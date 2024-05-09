<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::create([
            'name' => 'Anwar Fauzi',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('admin@gmail.com'),
        ]);
        $admin->assignRole('admin');
    }
}
