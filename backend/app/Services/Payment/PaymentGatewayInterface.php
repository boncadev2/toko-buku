<?php
namespace App\Services\Payment;
use App\Models\Order;
interface PaymentGatewayInterface { public function create(Order $order): array; public function verify(array $payload): bool; }
