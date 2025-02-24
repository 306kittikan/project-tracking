<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_code',
        'user_id',
        'status',
        'total_price',
        'tracking_number',
        'shipping_status'
    ];

    /**
     * ความสัมพันธ์กับ User (ลูกค้า)
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * ความสัมพันธ์กับ OrderItem (รายการสินค้าในคำสั่งซื้อ)
     */
    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    /**
     * ความสัมพันธ์กับ Product ผ่าน OrderItem (สินค้าในคำสั่งซื้อ)
     */
    public function products()
    {
        return $this->belongsToMany(Product::class, 'order_items')
                    ->withPivot('quantity', 'price')
                    ->withTimestamps();
    }

    /**
     * คำนวณราคารวมของคำสั่งซื้อ
     */
    public function getTotalPriceAttribute()
    {
        if (!$this->relationLoaded('items')) {
            return $this->items()->sum(DB::raw('quantity * price'));
        }

        return round($this->items->sum(fn ($item) => $item->quantity * $item->price), 2);
    }

    /**
     * ความสัมพันธ์กับ TrackingStatus (สถานะติดตามการจัดส่ง)
     */
    public function trackingStatus()
    {
        return $this->hasOne(TrackingStatus::class, 'order_id')->withDefault([
            'status' => 'ยังไม่มีข้อมูล',
        ]);
    }
}
