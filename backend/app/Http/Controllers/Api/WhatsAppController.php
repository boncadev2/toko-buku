<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller; use App\Models\Order; use Illuminate\Http\Request; use Illuminate\Support\Str;
class WhatsAppController extends Controller { public function order(Request $r, Order $order) { $phone=config('services.whatsapp.store_number'); abort_unless($phone,503,'Nomor WhatsApp toko belum dikonfigurasi.'); $token=$r->header('X-Cart-Token'); if($order->user_id && $r->user('sanctum')?->id!==$order->user_id) abort(403); if(!$order->user_id && !hash_equals((string)$order->guest_token,(string)$token)) abort(403); $order->load('items'); foreach($order->items as $item) $order->whatsAppClicks()->create(['book_id'=>$item->book_id,'guest_token'=>$token]);
        if ($order->status === 'pending_payment') {
            $order->update(['status' => 'manual_payment']);
            $order->histories()->create(['status' => 'manual_payment', 'note' => 'Menunggu Pembayaran Manual (WhatsApp)']);
        } $lines=$order->items->map(fn($i)=>"- {$i->title} x{$i->quantity} (Rp".number_format($i->subtotal,0,',','.').')')->implode("\n"); $addressLine = $order->recipient_name . " - " . $order->phone . "\n" . $order->address_line_1 . ", " . $order->city . ", " . $order->province . " " . $order->postal_code;
        $message="Halo, saya ingin memproses pesanan saya:\n\n*Order ID:* {$order->number}\n\n*Daftar Pesanan:*\n{$lines}\n\n*Total Tagihan:* Rp".number_format($order->grand_total,0,',','.')."\n\n*Alamat Pengiriman:*\n{$addressLine}\n\nMohon info untuk pembayarannya. Terima kasih."; return response()->json(['data'=>['url'=>'https://wa.me/'.$phone.'?text='.rawurlencode($message)]]); } }
