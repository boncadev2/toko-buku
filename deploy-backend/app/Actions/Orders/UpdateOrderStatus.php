<?php
namespace App\Actions\Orders;
use App\Models\Order; use Illuminate\Validation\ValidationException;
class UpdateOrderStatus { public function handle(Order $order,string $status,?string $note=null): Order { if($order->status===$status) throw ValidationException::withMessages(['status'=>['Status order tidak berubah.']]); $order->update(['status'=>$status]); $order->histories()->create(['status'=>$status,'note'=>$note]); return $order->load('histories'); } }
