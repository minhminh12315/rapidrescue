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
        DB::table('ambulances')->insert([
            [
                'name' => 'Xe cứu thương Ford Transit',
                'address' => '21.0134, 105.8324',
                'type' => 'Cấp cứu thường',
                'price' => '2000000',
                'image' => 'https://mehedi.asiandevelopers.com/ambons/assets/images/blog/blog-v1-3.jpg',
                'driver_id' => '1',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Xe cứu thương Hyundai Starex',
                'address' => '21.0375, 105.8123',
                'type' => 'Cấp cứu chuyên dụng',
                'price' => '2500000',
                'image' => 'https://mehedi.asiandevelopers.com/ambons/assets/images/blog/blog-v1-1.jpg',
                'driver_id' => '2',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Xe cứu thương Mercedes-Benz Sprinter',
                'address' => '21.0358, 105.8405',
                'type' => 'Cấp cứu cao cấp',
                'price' => '3000000',
                'image' => 'https://mehedi.asiandevelopers.com/ambons/assets/images/blog/blog-v1-2.jpg',
                'driver_id' => '3',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Xe cứu thương Toyota Hiace',
                'address' => '21.0072, 105.8419',
                'type' => 'Cấp cứu thông dụng',
                'price' => '2200000',
                'image' => 'https://mehedi.asiandevelopers.com/ambons/assets/images/blog/blog-v1-3.jpg',
                'driver_id' => '4',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Xe cứu thương Iveco Daily',
                'address' => '21.0023, 105.8494',
                'type' => 'Cấp cứu hiện đại',
                'price' => '3200000',
                'image' => 'https://mehedi.asiandevelopers.com/ambons/assets/images/blog/blog-v1-4.jpg',
                'driver_id' => '5',
                'created_at' => now(),
                'updated_at' => now()
            ],
        ]);
    }
}
