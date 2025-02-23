<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\TrackingStatusController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AccountController;

Route::get('/tracking-statuses', [TrackingStatusController::class, 'index'])->name('tracking.index');
Route::get('/tracking-statuses/create', [TrackingStatusController::class, 'create'])->name('tracking.create');
Route::post('/tracking-statuses', [TrackingStatusController::class, 'store'])->name('tracking.store');
Route::get('/tracking-statuses/{trackingStatus}/edit', [TrackingStatusController::class, 'edit'])->name('tracking.edit');
Route::put('/tracking-statuses/{trackingStatus}', [TrackingStatusController::class, 'update'])->name('tracking.update');
Route::delete('/tracking-statuses/{trackingStatus}', [TrackingStatusController::class, 'destroy'])->name('tracking.destroy');
Route::get('/tracking-statuses/{id}', [TrackingStatusController::class, 'show'])->name('tracking.show');


Route::middleware(['auth'])->group(function () {
    // หน้า Settings
    Route::get('/settings', function () {
        return inertia('Auth/Settings'); // หน้า Settings.jsx
    })->name('settings');

    // จัดกลุ่มเส้นทางเกี่ยวกับบัญชี
    Route::prefix('account')->name('account.')->group(function () {
        Route::post('/update-profile', [AccountController::class, 'updateProfile'])->name('update-profile');
        Route::post('/change-password', [AccountController::class, 'changePassword'])->name('change-password');
        Route::delete('/delete', [AccountController::class, 'deleteAccount'])->name('delete');
    });
});


// ✅ หน้า Dashboard เปลี่ยนเป็น Products
Route::get('/', function () {
    return redirect('/products');
})->name('dashboard');

// ✅ เส้นทางที่ต้องใช้ Login
Route::middleware(['auth'])->group(function () {
    // ✅ สินค้า
    Route::resource('products', ProductController::class);

    // ✅ คำสั่งซื้อ
    Route::resource('orders', OrderController::class);
    Route::delete('/orders/{order}', [OrderController::class, 'destroy']);
    Route::put('/orders/{order}/toggle-payment', [OrderController::class, 'togglePaymentStatus']);

    // ✅ ติดตามสินค้า
    Route::resource('tracking-statuses', TrackingStatusController::class);
    Route::get('/tracking', [TrackingStatusController::class, 'index'])->name('tracking.index');
    Route::get('/tracking/{order_id}', [TrackingStatusController::class, 'show'])->name('tracking.show');

    // ✅ ผู้ใช้ (เฉพาะแอดมิน)
    Route::resource('users', UserController::class);

    // ✅ Logout
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});

// ✅ Authentication (Login & Register)
Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::get('/register', [AuthController::class, 'showRegisterForm']);
Route::post('/register', [AuthController::class, 'register']);
