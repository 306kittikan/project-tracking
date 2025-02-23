<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class PaymentSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        $methods = ['credit_card', 'bank_transfer', 'paypal'];
        $statuses = ['paid', 'pending', 'failed'];

        foreach (range(1, 20) as $index) {
            DB::table('payments')->insert([
                'order_id' => $index,
                'amount' => $faker->randomFloat(2, 5000, 50000),
                'method' => $faker->randomElement($methods),
                'status' => $faker->randomElement($statuses),
                'created_at' => now()
            ]);
        }
    }
}
