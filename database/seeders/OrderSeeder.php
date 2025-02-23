<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class OrderSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        $statusOptions = ['pending', 'shipped', 'completed', 'canceled'];

        for ($i = 0; $i < 20; $i++) { // สร้าง 20 ออเดอร์
            DB::table('orders')->insert([
                'order_code' => 'ORD-' . strtoupper(uniqid()), // รหัสคำสั่งซื้อไม่ซ้ำ
                'user_id' => $faker->numberBetween(1, 10), // จำลอง user_id (1-10)
                'status' => $faker->randomElement($statusOptions), // ใช้ค่าที่อยู่ใน ENUM เท่านั้น
                'total_price' => $faker->randomFloat(2, 500, 50000), // ราคาสุ่ม
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    }
}
