<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'name',
        'price',
        'stock'
    ];

    // ✅ เชื่อมกับคำสั่งซื้อผ่าน order_items
    public function orders()
    {
        return $this->belongsToMany(Order::class, 'order_items')
                    ->withPivot('quantity', 'price')
                    ->withTimestamps();
    }

    // ✅ เช็คว่าสินค้ามีสต็อกพอหรือไม่
    public function hasStock($quantity)
    {
        return $this->stock >= $quantity;
    }

    // ✅ หักจำนวนสินค้าออกจากสต็อก
    public function decreaseStock($quantity)
    {
        if ($this->hasStock($quantity)) {
            $this->stock -= $quantity;
            $this->save();
        } else {
            throw new \Exception("สินค้าคงเหลือไม่เพียงพอ");
        }
    }

    // ✅ เพิ่มสต็อกสินค้า (เช่น กรณียกเลิกออเดอร์)
    public function increaseStock($quantity)
    {
        $this->stock += $quantity;
        $this->save();
    }
}
