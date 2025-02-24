<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage; //  ใช้ Storage เพื่อลบไฟล์เก่า

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return Inertia::render('Products/Index', ['products' => $products]);
    }

    public function create()
    {
        return Inertia::render('Products/Create');
    }

   public function store(Request $request)
{
    $data = $request->only(['code', 'name', 'price', 'stock', 'description']);

    if ($request->hasFile('image')) {
        $data['image'] = $request->file('image')->store('products', 'public');
    }

    Product::create($data);

    return redirect('/products')->with('success', 'เพิ่มสินค้าสำเร็จ!');
}


    public function edit($id)
    {
        $product = Product::findOrFail($id);
        return Inertia::render('Products/Edit', ['product' => $product]);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $request->validate([
            'code' => 'required|unique:products,code,' . $product->id,
            'name' => 'required',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $data = $request->all();

        //  อัปโหลดรูปใหม่ และลบรูปเก่า
        if ($request->hasFile('image')) {
            if ($product->image) {
                Storage::disk('public')->delete($product->image); // ลบรูปเก่า
            }
            $data['image'] = $request->file('image')->store('products', 'public');
        }

        $product->update($data);

        return redirect('/products')->with('success', 'อัปเดตสินค้าสำเร็จ!');
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        
        //  ลบไฟล์รูปก่อนลบข้อมูล
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }

        $product->delete();

        return redirect('/products')->with('success', 'ลบสินค้าสำเร็จ!');
    }
}
