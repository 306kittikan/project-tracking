<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with('user', 'products')->get();
        return Inertia::render('Orders/Index', [
            'orders' => $orders
        ]);
    }

    public function create()
    {
        return Inertia::render('Orders/Create', [
            'users' => User::all(),
            'products' => Product::all()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'products' => 'required|array|min:1',
            'products.*.product_id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
        ]);

        // ✅ คำนวณราคารวม
        $total_price = 0;
        foreach ($request->products as $item) {
            $product = Product::findOrFail($item['product_id']);
            $total_price += $product->price * $item['quantity'];
        }

        // ✅ สร้างคำสั่งซื้อใหม่
        $order = Order::create([
            'order_code' => 'ORD-' . strtoupper(Str::random(8)),
            'user_id' => $request->user_id,
            'status' => 'pending',
            'total_price' => $total_price,
        ]);

        // ✅ บันทึกรายการสินค้าที่สั่งซื้อ
        foreach ($request->products as $item) {
            $product = Product::findOrFail($item['product_id']);
            $order->products()->attach($item['product_id'], [
                'quantity' => $item['quantity'],
                'price' => $product->price,
            ]);
        }

        return redirect('/orders')->with('success', 'สร้างคำสั่งซื้อเรียบร้อย');
    }

    public function show(Order $order)
    {
        return Inertia::render('Orders/Show', [
            'order' => $order->load('user', 'products'),
        ]);
    }

    public function edit(Order $order)
    {
        return Inertia::render('Orders/Edit', [
            'order' => $order->load('products'),
            'statuses' => ['pending', 'processing', 'completed', 'canceled']
        ]);
    }

    public function update(Request $request, Order $order)
    {
        $request->validate(['status' => 'required']);
        $order->update(['status' => $request->status]);
        return redirect('/orders');
    }

    public function destroy(Order $order)
    {
        $order->delete();
        return redirect('/orders')->with('success', 'ลบคำสั่งซื้อเรียบร้อยแล้ว');
    }

    public function togglePaymentStatus(Order $order)
    {
        $order->payment_status = $order->payment_status === 'paid' ? 'unpaid' : 'paid';
        $order->save();

        return redirect()->back()->with('success', 'อัปเดตสถานะการชำระเงินเรียบร้อย!');
    }
}
