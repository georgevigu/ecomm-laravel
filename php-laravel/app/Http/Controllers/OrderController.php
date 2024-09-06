<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Order;

class OrderController extends Controller
{
    function addOrder(Request $req)
    {
        try {
            $req->validate([
                'customer_name' => 'required|string|max:255',
                'products' => 'required|array',
                'products.*.product_id' => 'required|integer|exists:products,id',
                'products.*.quantity' => 'required|integer|min:1',
                'status' => 'required|string|in:pending,completed,cancelled',
            ]);

            $order = new Order();
            $order->customer_name = $req->input('customer_name');
            $order->status = $req->input('status');
            $order->save();

            $products = $req->input('products');
            foreach ($products as $product) {
                $order->products()->attach($product['product_id'], ['quantity' => $product['quantity']]);
            }

            return response()->json(['result' => 'Order has been created', 'order' => $order->load('products')], 201);
        } catch (\Exception $e) {
            Log::error('Error creating order: ' . $e->getMessage());
            return response()->json(['result' => 'Failed to create order', 'error' => $e->getMessage()], 500);
        }
    }


    function getAllOrders()
    {
        $orders = Order::with('products')->get();
        return response()->json($orders);
    }

    function delete($id)
    {
        try {
            $result = Order::where('id', $id)->delete();
            if ($result) {
                return response()->json(['result' => 'Order has been deleted']);
            } else {
                return response()->json(['result' => 'Operation failed'], 404);
            }
        } catch (\Exception $e) {
            Log::error('Error deleting order: ' . $e->getMessage());
            return response()->json(['result' => 'Failed to delete order', 'error' => $e->getMessage()], 500);
        }
    }

    public function getOrder($id)
    {
        $order = Order::find($id);
        if ($order) {
            return response()->json($order);
        } else {
            return response()->json(['result' => 'Order not found'], 404);
        }
    }
}
