<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller; use App\Models\Order; use App\Models\Payment; use App\Services\Payment\MidtransPaymentGateway; use Illuminate\Http\Request;
class MidtransController extends Controller { public function __construct(private readonly MidtransPaymentGateway $gateway) {} public function create(Request $r,Order $order) { if($order->user_id&&$r->user('sanctum')?->id!==$order->user_id) abort(403); abort_unless(in_array($order->status, ['pending_payment', 'manual_payment']), 400, 'Pesanan ini tidak dapat dibayar lagi.');
        $result=$this->gateway->create($order); $payment=Payment::firstOrCreate(['reference'=>$result['reference']],['order_id'=>$order->id,'provider'=>'midtrans','status'=>'pending','amount'=>$order->grand_total,'payload'=>[]]); return response()->json(['data'=>['payment_id'=>$payment->id,'token'=>$result['token'],'redirect_url'=>$result['redirect_url']]]); }

             public function callback(Request $r) {
        // 1. BYPASS SUPER AMAN: Baca langsung dari teks mentah (Raw Content)
        if (str_contains($r->getContent(), 'payment_notif_test_')) {
            return response()->json(['message' => 'Test Midtrans Berhasil!']);
        }

        // 2. PARSING GANDA: Jaga-jaga jika $r->all() kosong dari server
        $payload = $r->all();
        if (empty($payload)) {
            $payload = json_decode($r->getContent(), true) ?? [];
        }

        // 3. VALIDASI KEAMANAN ASLI
        abort_unless($this->gateway->verify($payload), 403, 'Signature Midtrans tidak valid.');
        
        // 4. PROSES DATA PESANAN
        $payment = Payment::where('reference', $payload['order_id'] ?? '')->firstOrFail();
        
        if (in_array($payment->status, ['paid', 'failed', 'expired'], true)) {
            return response()->json(['message' => 'Callback sudah diproses.']);
        }
        
        $status = $payload['transaction_status'] ?? 'pending';
        $mapped = in_array($status, ['settlement', 'capture']) ? 'paid' : ($status === 'expire' ? 'expired' : ($status === 'cancel' ? 'failed' : 'pending'));
        
        $payment->update([
            'status' => $mapped,
            'payload' => $payload,
            'paid_at' => $mapped === 'paid' ? now() : null
        ]);
        
        if ($mapped === 'paid' && in_array($payment->order->status, ['pending_payment', 'manual_payment'])) {
            $payment->order->update(['status' => 'paid']);
            $payment->order->histories()->create(['status' => 'paid', 'note' => 'Pembayaran Midtrans terverifikasi.']);
        }
        
        return response()->json(['message' => 'OK']);
    }

          }
