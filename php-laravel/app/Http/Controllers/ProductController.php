<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Product;


class ProductController extends Controller
{
    //
    function addProduct(Request $req) {
        $product = new Product();
        $product->name=$req->input('name');
        $product->price=$req->input('price');
        $product->description=$req->input('description');
        $product->file_path=$req->file('file')->store('products');
        $product->save();
        return $product;
    }
    function list() {
        return Product::all();
    }
    function delete($id) {
        $result = Product::where('id',$id)->delete();
        if($result) {
            return ["result"=>"Product has been deleted"];
        }
        else {
            return ["result"=>"Operation failed"];
        }
    }
    function getProduct($id) {
        return Product::find($id);
    }
    
    function updateProduct(Request $request, $id)
    {
        try {
            // Find the product by ID
            $product = Product::find($id);

            if (!$product) {
                return response()->json(['result' => 'Product not found'], 404);
            }

            // Validate the request
            $request->validate([
                'name' => 'required|string|max:255',
                'price' => 'required|numeric',
                'description' => 'nullable|string',
                'file' => 'nullable|file|mimes:jpg,jpeg,png,bmp|max:2048'
            ]);

            // Update the product details
            $product->name = $request->input('name');
            $product->price = $request->input('price');
            $product->description = $request->input('description');

            // Handle file upload
            if ($request->hasFile('file')) {
                $product->file_path = $request->file('file')->store('products');
            }

            // Save the updated product
            $product->save();

            return response()->json(['result' => 'Product has been updated', 'product' => $product]);
        } catch (\Exception $e) {
            Log::error('Error updating product: ' . $e->getMessage());
            return response()->json(['result' => 'Failed to update product', 'error' => $e->getMessage()], 500);
        }
    }

    function search($key) {
        return Product::where('name','Like',"%$key%")->get();
    }
}
