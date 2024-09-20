<?php

namespace Database\Seeders;

use App\Models\Text;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class TextSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('texts')->insert([
            ['content' => 'abc', 'type' => 'text', 'created_at' => now(), 'updated_at' => now()],
            ['content' => 'def', 'type' => 'text', 'created_at' => now(), 'updated_at' => now()],
            ['content' => 'ghi', 'type' => 'text', 'created_at' => now(), 'updated_at' => now()],
            ['content' => 'jkl', 'type' => 'text', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
