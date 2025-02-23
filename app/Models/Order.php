<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'order_items')
                    ->withPivot('quantity', 'price')
                    ->withTimestamps();
    }

    // ✅ คำนวณราคารวมของคำสั่งซื้อ
    public function getTotalPriceAttribute()
    {
        if (!$this->relationLoaded('products')) {
            return $this->products()->sum(\DB::raw('order_items.quantity * order_items.price'));
        }

        return round($this->products->sum(fn ($product) => $product->pivot->quantity * $product->pivot->price), 2);
    }

    // ✅ สถานะติดตามคำสั่งซื้อ
    public function trackingStatus()
    {
        return $this->hasOne(TrackingStatus::class, 'order_id')->withDefault([
            'status' => 'ยังไม่มีข้อมูล',
        ]);
    }
}
