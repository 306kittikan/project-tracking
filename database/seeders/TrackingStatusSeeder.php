<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Order;

class TrackingStatusSeeder extends Seeder
{
    public function run()
    {
        $orders = Order::all();

        if ($orders->isEmpty()) {
            $this->command->info(' ไม่มีคำสั่งซื้อในระบบ กรุณารัน OrderSeeder ก่อน!');
            return;
        }

        foreach ($orders as $order) {
            DB::table('tracking_statuses')->insert([
                'order_id' => $order->id,
                'status' => $this->mapOrderStatus($order->status), // ใช้สถานะที่ตรงกัน
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $this->command->info(' Tracking statuses seeded successfully!');
    }

    private function mapOrderStatus($orderStatus)
    {
        $statusMap = [
            'panding' => 'รอการยืนยัน', 
            'shipped' => 'จัดส่งแล้ว',
            'completed' => 'ถึงปลายทาง',
            'canceled' => 'ยกเลิกคำสั่งซื้อ'
        ];

        return $statusMap[$orderStatus] ?? 'ไม่ทราบสถานะ';
    }
}
