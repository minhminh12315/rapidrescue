<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 10; $i++) {
            User::create([
                'first_name' => 'Driver' . $i,
                'last_name' => 'Test',
                'email' => 'driver' . $i . '@example.com',
                'password' => Hash::make('password'),
                'role' => 'driver',
                'phone' => '0123456789'
            ]);
        }

        // Tạo 10 user với role là "customer"
        for ($i = 1; $i <= 10; $i++) {
            User::create([
                'first_name' => 'Customer' . $i,
                'last_name' => 'Test',
                'email' => 'customer' . $i . '@example.com',
                'password' => Hash::make('password'),
                'role' => 'customer',
                'phone' => '0123456789'
            ]);
        }

        // Tạo 10 user với role là "admin"
        for ($i = 1; $i <= 10; $i++) {
            User::create([
                'first_name' => 'Admin' . $i,
                'last_name' => 'Test',
                'email' => 'admin' . $i . '@example.com',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'phone' => '0123456789'
            ]);
        }

        // Tạo 10 user với role là "emt"
        for ($i = 1; $i <= 10; $i++) {
            User::create([
                'first_name' => 'EMT' . $i,
                'last_name' => 'Test',
                'email' => 'emt' . $i . '@example.com',
                'password' => Hash::make('password'),
                'role' => 'emt',
                'phone' => '0123456789'
            ]);
        }
    }
}
