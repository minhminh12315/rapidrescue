<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HospitalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('hospitals')->insert([
            ['name' => 'Bệnh viện Bạch Mai', 'address' => '21.0278, 105.8342', 'phone' => '', 'created_at' => now(), 'updated_at' => now()],  // Hà Nội
            ['name' => 'Bệnh viện Đa khoa Hà Nội', 'address' => '16.0471, 108.2068', 'phone' => '', 'created_at' => now(), 'updated_at' => now()], // Đà Nẵng
            ['name' => 'Bệnh viện 108', 'address' => '10.7626, 106.6602', 'phone' => '', 'created_at' => now(), 'updated_at' => now()], // Hồ Chí Minh
            ['name' => 'Bệnh viện Đại học Y Hà Nội', 'address' => '22.3996, 103.4669', 'phone' => '', 'created_at' => now(), 'updated_at' => now()], // Lào Cai
            ['name' => 'Bệnh viện Thanh Nhàn', 'address' => '13.7597, 109.2192', 'phone' => '', 'created_at' => now(), 'updated_at' => now()], // Quy Nhơn
            ['name' => 'Bệnh viện K Trung ương', 'address' => '11.9317, 108.4428', 'phone' => '', 'created_at' => now(), 'updated_at' => now()], // Đà Lạt
            ['name' => 'Bệnh viện Việt Đức', 'address' => '20.8560, 106.6822', 'phone' => '', 'created_at' => now(), 'updated_at' => now()], // Hải Phòng
            ['name' => 'Bệnh viện Nhi Trung ương', 'address' => '9.9347, 106.3439', 'phone' => '', 'created_at' => now(), 'updated_at' => now()], // Vĩnh Long
            ['name' => 'Bệnh viện Xanh Pôn', 'address' => '15.1160, 108.8076', 'phone' => '', 'created_at' => now(), 'updated_at' => now()], // Quảng Nam
            ['name' => 'Bệnh viện Tim Hà Nội', 'address' => '10.0452, 105.7469', 'phone' => '', 'created_at' => now(), 'updated_at' => now()], // Cần Thơ
        ]);
    }
}
