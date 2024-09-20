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
            ['name' => 'Bệnh viện Bạch Mai', 'address' => '21.0278, 105.8342', 'address_street' => '78 Đường Giải Phóng', 'phone' => '', 'image' => 'https://mehedi.asiandevelopers.com/ambons/assets/images/blog/blog-v1-3.jpg', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Bệnh viện Đa khoa Hà Nội', 'address' => '16.0471, 108.2068', 'address_street' => '29 Hàn Thuyên', 'phone' => '', 'image' => 'https://mehedi.asiandevelopers.com/ambons/assets/images/blog/blog-v1-1.jpg', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Bệnh viện 108', 'address' => '10.7626, 106.6602', 'address_street' => '1 Trần Hưng Đạo', 'phone' => '', 'image' => 'https://mehedi.asiandevelopers.com/ambons/assets/images/blog/blog-v1-2.jpg', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Bệnh viện Đại học Y Hà Nội', 'address' => '22.3996, 103.4669', 'address_street' => '1 Tôn Thất Tùng', 'phone' => '', 'image' => 'https://mehedi.asiandevelopers.com/ambons/assets/images/blog/blog-v1-5.jpg', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Bệnh viện Thanh Nhàn', 'address' => '13.7597, 109.2192', 'address_street' => '42 Thanh Nhàn', 'phone' => '', 'image' => 'https://mehedi.asiandevelopers.com/ambons/assets/images/blog/blog-v1-6.jpg', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Bệnh viện K Trung ương', 'address' => '11.9317, 108.4428', 'address_street' => '43 Quán Sứ', 'phone' => '', 'image' => 'https://mehedi.asiandevelopers.com/ambons/assets/images/blog/blog-v1-4.jpg', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Bệnh viện Việt Đức', 'address' => '20.8560, 106.6822', 'address_street' => '40 Tràng Thi', 'phone' => '', 'image' => '', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Bệnh viện Nhi Trung ương', 'address' => '9.9347, 106.3439', 'address_street' => '18/879 La Thành', 'phone' => '', 'image' => 'https://mehedi.asiandevelopers.com/ambons/assets/images/blog/blog-v1-1.jpg', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Bệnh viện Xanh Pôn', 'address' => '15.1160, 108.8076', 'address_street' => '12 Chu Văn An', 'phone' => '', 'image' => 'https://mehedi.asiandevelopers.com/ambons/assets/images/blog/blog-v1-2.jpg', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Bệnh viện Tim Hà Nội', 'address' => '10.0452, 105.7469', 'address_street' => '92 Trần Hưng Đạo', 'phone' => '', 'image' => 'https://mehedi.asiandevelopers.com/ambons/assets/images/blog/blog-v1-3.jpg', 'created_at' => now(), 'updated_at' => now()],
        ]);
        
    }
}
