<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class AccountController extends Controller
{
    /**
     * อัปเดตข้อมูลบัญชี (ชื่อ, อีเมล)
     */
    public function updateProfile(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        return back()->with('success', 'อัปเดตข้อมูลบัญชีเรียบร้อยแล้ว');
    }

    /**
     * เปลี่ยนรหัสผ่าน
     */
    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => ['required', 'current_password'],
            'new_password' => ['required', 'string', Rules\Password::defaults(), 'confirmed'],
        ]);

        $user = Auth::user();
        $user->update([
            'password' => Hash::make($request->new_password),
        ]);

        return back()->with('success', 'เปลี่ยนรหัสผ่านเรียบร้อยแล้ว');
    }

    /**
     * ลบบัญชี
     */
    public function deleteAccount(Request $request)
    {
        $request->validate([
            'delete_password' => ['required', 'current_password'],
        ]);

        $user = Auth::user();
        $user->delete();

        Auth::logout();

        return redirect('/')->with('success', 'บัญชีของคุณถูกลบเรียบร้อยแล้ว');
    }
}
