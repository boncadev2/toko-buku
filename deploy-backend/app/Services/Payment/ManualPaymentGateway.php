<?php
namespace App\Services\Payment;
use App\Models\Order; use Illuminate\Support\Str;
class ManualPaymentGateway implements PaymentGatewayInterface { public function create(Order $order): array { return ['reference'=>'MAN-'.strtoupper(Str::random(12)),'status'=>'pending']; } public function verify(array $payload): bool { return isset($payload['reference'],$payload['status']); } }
