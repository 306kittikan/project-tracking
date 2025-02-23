<?php

namespace App\Http\Controllers;

use App\Models\TrackingStatus;
use App\Models\Order;
use Illuminate\Http\Request;

class TrackingStatusController extends Controller
{
    /**
     * แสดงรายการสถานะการจัดส่งทั้งหมด
     */
    public function index()
    {
        $trackings = TrackingStatus::with(['order.user'])->latest()->get();
        return inertia('Tracking/Index', ['trackings' => $trackings]);
    }

    /**
     * แสดงฟอร์มสร้างสถานะการจัดส่ง
     */
    public function create()
    {
        $orders = Order::doesntHave('trackingStatus')->get(); // ดึงเฉพาะ order ที่ยังไม่มี tracking
        return inertia('Tracking/Form', ['orders' => $orders]);
    }

    /**
     * บันทึกสถานะการจัดส่งใหม่
     */
    public function store(Request $request)
    {
        $request->validate([
            'order_id' => 'required|exists:orders,id',
            'status' => 'required|string|max:255',
        ]);

        TrackingStatus::create([
            'order_id' => $request->order_id,
            'status' => $request->status,
        ]);

        return redirect('/tracking-statuses')->with('success', 'เพิ่มสถานะการจัดส่งเรียบร้อยแล้ว!');
    }

    /**
     * แสดงฟอร์มแก้ไขสถานะการจัดส่ง
     */
    public function edit(TrackingStatus $trackingStatus)
    {
        $orders = Order::all(); // ดึงรายการคำสั่งซื้อทั้งหมด
        return inertia('Tracking/Form', [
            'tracking' => $trackingStatus,
            'orders' => $orders,
        ]);
    }

    /**
     * แสดงรายละเอียดสถานะการจัดส่งของคำสั่งซื้อ
     */
    public function show($id)
{
    $tracking = TrackingStatus::where('order_id', $id)
        ->with([
            'order.user',
            'order.items.product' // ดึงข้อมูลสินค้าภายในคำสั่งซื้อ
        ])
        ->firstOrFail();

    return inertia('Tracking/Show', ['tracking' => $tracking]);
}


    /**
     * อัปเดตสถานะการจัดส่ง
     */
    public function update(Request $request, TrackingStatus $trackingStatus)
    {
        $request->validate([
            'status' => 'required|string|max:255',
        ]);

        $trackingStatus->update(['status' => $request->status]);

        return redirect('/tracking-statuses')->with('success', 'อัปเดตสถานะเรียบร้อยแล้ว!');
    }

    /**
     * ลบสถานะการจัดส่ง
     */
    public function destroy(TrackingStatus $trackingStatus)
    {
        $trackingStatus->delete();

        return redirect('/tracking-statuses')->with('success', 'ลบสถานะการจัดส่งเรียบร้อยแล้ว!');
    }
}
