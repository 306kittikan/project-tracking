<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class ProductSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        $products = [
            // สมาร์ทโฟน
            ['iPhone 15 Pro Max', 'สมาร์ทโฟนระดับพรีเมียมจาก Apple พร้อมชิป A17 Pro และกล้อง 48MP'],
            ['Samsung Galaxy S23 Ultra', 'สมาร์ทโฟนเรือธงจาก Samsung พร้อม S-Pen และกล้อง 200MP'],
            ['Google Pixel 8 Pro', 'สมาร์ทโฟนจาก Google พร้อม AI Camera และ Android 14'],
            ['Xiaomi 13 Ultra', 'สมาร์ทโฟนจาก Xiaomi พร้อมกล้อง Leica และแบตเตอรี่ 5000mAh'],
            ['OnePlus 11', 'สมาร์ทโฟนจาก OnePlus พร้อม Snapdragon 8 Gen 2 และชาร์จเร็ว 100W'],

            // แล็ปท็อป
            ['MacBook Pro 16"', 'แล็ปท็อปสำหรับมืออาชีพจาก Apple มาพร้อมชิป M3 Pro และจอ Liquid Retina'],
            ['Dell XPS 15', 'แล็ปท็อปบางเบาจาก Dell พร้อมหน้าจอ 4K OLED และ Intel i9'],
            ['ASUS ROG Zephyrus G14', 'แล็ปท็อปเกมมิ่งขนาดพกพาพร้อม Ryzen 9 และ RTX 4070'],
            ['Lenovo ThinkPad X1 Carbon', 'โน้ตบุ๊กธุรกิจระดับพรีเมียม พร้อมดีไซน์บางเบาและแบตอึด'],
            ['HP Spectre x360', 'แล็ปท็อปแบบ 2-in-1 รองรับการพับ 360° และจอ OLED Touch'],

            // แท็บเล็ต
            ['iPad Air 5', 'แท็บเล็ตจาก Apple พร้อมชิป M1 และรองรับ Apple Pencil 2'],
            ['Samsung Galaxy Tab S9', 'แท็บเล็ต Android ระดับเรือธง รองรับ S-Pen และจอ AMOLED'],
            ['Microsoft Surface Pro 9', 'แท็บเล็ต 2-in-1 พร้อม Windows 11 และรองรับ Surface Pen'],
            ['Lenovo Tab P12', 'แท็บเล็ตสำหรับความบันเทิง พร้อมลำโพง Dolby Atmos และจอ 12 นิ้ว'],
            ['Xiaomi Pad 6', 'แท็บเล็ตจาก Xiaomi พร้อม Snapdragon 870 และจอ 144Hz'],

            // หูฟัง & ลำโพง
            ['AirPods Pro 2', 'หูฟังไร้สายจาก Apple พร้อมระบบตัดเสียง ANC และ Spatial Audio'],
            ['Sony WH-1000XM5', 'หูฟังตัดเสียงรบกวนที่ดีที่สุดจาก Sony พร้อมแบตใช้งาน 30 ชั่วโมง'],
            ['Bose QuietComfort 45', 'หูฟังจาก Bose ที่มีระบบตัดเสียงขั้นสูงและเสียงเบสที่นุ่มลึก'],
            ['JBL Charge 5', 'ลำโพงพกพาจาก JBL กันน้ำ IP67 และแบตอึด 20 ชั่วโมง'],
            ['Sennheiser Momentum 4', 'หูฟังไร้สายเสียงคุณภาพระดับ Hi-Fi พร้อมดีไซน์หรูหรา'],

            // เกมคอนโซล
            ['PlayStation 5', 'เครื่องเล่นเกมจาก Sony รองรับ 4K 120Hz และเกมเอ็กซ์คลูซีฟระดับ AAA'],
            ['Xbox Series X', 'เครื่องเล่นเกมจาก Microsoft พร้อม SSD เร็วพิเศษและ Game Pass'],
            ['Nintendo Switch OLED', 'คอนโซลพกพาจาก Nintendo พร้อมหน้าจอ OLED 7 นิ้ว'],
            ['Steam Deck', 'เครื่องเล่นเกมพกพาจาก Valve รองรับเกมจาก Steam โดยตรง'],
            ['Meta Quest 3', 'แว่น VR ใหม่ล่าสุดจาก Meta รองรับเทคโนโลยี Mixed Reality'],

            // สมาร์ทวอทช์
            ['Apple Watch Ultra', 'สมาร์ทวอทช์สุดแกร่งจาก Apple สำหรับนักกีฬาสาย Adventure'],
            ['Samsung Galaxy Watch 5', 'สมาร์ทวอทช์จาก Samsung รองรับ ECG และเซ็นเซอร์สุขภาพ'],
            ['Garmin Fenix 7', 'นาฬิกาสำหรับนักกีฬา รองรับ GPS และแบตอึดสูงสุด 14 วัน'],
            ['Fitbit Sense 2', 'สมาร์ทวอทช์สายสุขภาพ พร้อมเซ็นเซอร์วัดความเครียดและการนอน'],
            ['Amazfit GTR 4', 'สมาร์ทวอทช์ราคาประหยัด รองรับ GPS และวัดอัตราการเต้นหัวใจ'],

            // อุปกรณ์เสริม
            ['Logitech MX Master 3S', 'เมาส์ไร้สายระดับโปรจาก Logitech พร้อมการปรับ DPI และ Silent Click'],
            ['Razer BlackWidow V4', 'คีย์บอร์ดเกมมิ่งจาก Razer พร้อมสวิตช์ Mechanical และไฟ RGB'],
            ['Elgato Stream Deck', 'อุปกรณ์ควบคุมสำหรับ Streamer ปรับแต่งปุ่ม Macro ได้'],
            ['SanDisk Extreme Portable SSD', 'SSD พกพาความเร็วสูง รองรับ USB-C และกันน้ำ IP55'],
            ['Anker PowerCore 26800', 'Power Bank ความจุ 26800mAh พร้อมพอร์ตชาร์จเร็ว 3 ช่อง']
        ];

        foreach ($products as $product) {
            DB::table('products')->insert([
                'code' => 'P' . uniqid(4),
                'name' => $product[0],
                'description' => $product[1], // ✅ เพิ่มคำอธิบายสินค้า
                'price' => $faker->randomFloat(2, 5000, 100000),
                'stock' => $faker->numberBetween(10, 100),
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    }
}
