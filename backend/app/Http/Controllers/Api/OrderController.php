<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller; use App\Services\Order\OrderService; use Illuminate\Http\Request; use Illuminate\Support\Str;
class OrderController extends Controller { public function __construct(private readonly OrderService $orders) {} public function store(Request $r) { $d=$r->validate(['item_ids'=>['required','array','min:1'],'item_ids.*'=>['integer'],'address'=>['required','array'],'address.recipient_name'=>['required','string','max:100'],'address.phone'=>['required','string','max:30'],'address.address_line_1'=>['required','string','max:500'],'address.city'=>['required','string','max:100'],'address.province'=>['required','string','max:100'],'address.postal_code'=>['required','string','max:15'], 'shipping_cost'=>['nullable','numeric'], 'shipping_method'=>['nullable','string']]); $u=$r->user('sanctum'); $t=$u?null:($r->header('X-Cart-Token')?: (string) Str::uuid()); $o=$this->orders->create($u,$t,$d['address'],$d['item_ids'], $d['shipping_cost'] ?? 0); return response()->json(['data'=>$o],201); }

    public function cancel(\Illuminate\Http\Request $r, \App\Models\Order $order) {
        if ($order->user_id && $r->user('sanctum')?->id !== $order->user_id) abort(403);
        if (!in_array($order->status, ['pending_payment', 'manual_payment'])) abort(400, 'Pesanan tidak dapat dibatalkan.');
        $order->update(['status' => 'cancelled']);
        $order->histories()->create(['status' => 'cancelled', 'note' => 'Dibatalkan oleh pembeli.']);
        return response()->json(['message' => 'Pesanan berhasil dibatalkan.']);
    } }
