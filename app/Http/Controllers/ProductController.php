<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
    $request->validate([
        'code' => 'required|unique:products,code',
        'name' => 'required',
        'price' => 'required|numeric',
        'stock' => 'required|integer',
    ]);

        Product::create($request->all());

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
    ]);

        $product->update($request->all());

        return redirect('/products')->with('success', 'อัปเดตสินค้าสำเร็จ!');
    }

    public function destroy($id)
    {
        Product::findOrFail($id)->delete();
        return redirect('/products')->with('success', 'ลบสินค้าสำเร็จ!');
    }
}
