<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class ShipmentSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        $statuses = ['shipped', 'in_transit', 'delivered'];

        foreach (range(1, 20) as $index) {
            DB::table('shipments')->insert([
                'order_id' => $index,
                'tracking_number' => strtoupper($faker->bothify('??#######')),
                'status' => $faker->randomElement($statuses),
                'estimated_delivery' => $faker->date(),
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    }
}

