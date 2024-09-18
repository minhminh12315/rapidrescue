<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class HospitalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('hospitals')->insert([
            ['name' => 'Bệnh viện Bạch Mai', 'address' => '21.0134, 105.8324', 'phone' => '', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Bệnh viện Đa khoa Hà Nội', 'address' => '21.0375, 105.8123', 'phone' => '', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Bệnh viện 108', 'address' => '21.0358, 105.8405', 'phone' => '', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Bệnh viện Đại học Y Hà Nội', 'address' => '21.0072, 105.8419', 'phone' => '', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Bệnh viện Thanh Nhàn', 'address' => '21.0023, 105.8494', 'phone' => '', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Bệnh viện K Trung ương', 'address' => '21.0441, 105.8321', 'phone' => '', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Bệnh viện Việt Đức', 'address' => '21.0137, 105.8432', 'phone' => '', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Bệnh viện Nhi Trung ương', 'address' => '21.0356, 105.8309', 'phone' => '', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Bệnh viện Xanh Pôn', 'address' => '21.0167, 105.8411', 'phone' => '', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Bệnh viện Tim Hà Nội', 'address' => '21.0142, 105.8300', 'phone' => '', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Bệnh viện Y học cổ truyền Trung ương', 'address' => '21.0204, 105.8329', 'phone' => '', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Bệnh viện Da liễu Trung ương', 'address' => '21.0325, 105.8215', 'phone' => '', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Bệnh viện Lao và Bệnh phổi Trung ương', 'address' => '21.0047, 105.8152', 'phone' => '', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Bệnh viện Phụ sản Hà Nội', 'address' => '21.0271, 105.8327', 'phone' => '', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Bệnh viện Tâm thần Trung ương I', 'address' => '21.0395, 105.7969', 'phone' => '', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Bệnh viện Nội tiết Trung ương', 'address' => '21.0292, 105.8179', 'phone' => '', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Bệnh viện Mắt Trung ương', 'address' => '21.0185, 105.8320', 'phone' => '', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Bệnh viện Trung ương Quân đội 354', 'address' => '21.0107, 105.8529', 'phone' => '', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Bệnh viện Bộ Công an', 'address' => '21.0370, 105.8354', 'phone' => '', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Bệnh viện Bộ Quốc phòng', 'address' => '21.0210, 105.8147', 'phone' => '', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Bệnh viện Đa khoa Đức Giang', 'address' => '21.0702, 105.8904', 'phone' => '', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Bệnh viện Đa khoa Nam Thăng Long', 'address' => '21.0485, 105.7696', 'phone' => '', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Bệnh viện Đa khoa Bắc Thăng Long', 'address' => '21.0270, 105.7881', 'phone' => '', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Bệnh viện Bệnh Nhiệt đới Trung ương', 'address' => '21.0271, 105.8327', 'phone' => '', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Bệnh viện Mắt Hà Nội', 'address' => '21.0275, 105.8328', 'phone' => '', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Bệnh viện Y học cổ truyền Hà Nội', 'address' => '21.0267, 105.8346', 'phone' => '', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Bệnh viện Tâm thần Hà Nội', 'address' => '21.0193, 105.8308', 'phone' => '', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
