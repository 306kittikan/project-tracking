<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class OrderItemSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        foreach (range(1, 50) as $index) {
            DB::table('order_items')->insert([
                'order_id' => $faker->numberBetween(1, 20),
                'product_id' => $faker->numberBetween(1, 10),
                'quantity' => $faker->numberBetween(1, 5),
                'price' => $faker->randomFloat(2, 5000, 30000),
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    }
}

