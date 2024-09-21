<?php

namespace Database\Seeders;

use App\Models\Ambulance;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class AmbulanceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $drivers = User::where('role', 'driver')->pluck('id');

        // Tạo 10 ambulances
        for ($i = 1; $i <= 10; $i++) {
            Ambulance::create([
                'name' => 'Ambulance' . $i,
                'image' => 'ambulance' . $i . '.jpg',
                'address' => 'Address ' . $i,
                'type' => 'Type ' . $i,
                'driver_id' => $drivers->random(), // Gán ngẫu nhiên một driver
                'price' => rand(10000, 50000)
            ]);
        }
        
        
    }
}
