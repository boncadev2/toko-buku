<?php
$f = 'backend/app/Http/Controllers/Api/OrderController.php';
$c = file_get_contents($f);
$c = str_replace(
    "} }",
    "public function cancel(\\Illuminate\\Http\\Request \$r, \\App\\Models\\Order \$order) {
        if (\$order->user_id && \$r->user('sanctum')?->id !== \$order->user_id) abort(403);
        if (!in_array(\$order->status, ['pending_payment', 'manual_payment'])) abort(400, 'Pesanan tidak dapat dibatalkan.');
        \$order->update(['status' => 'cancelled']);
        \$order->histories()->create(['status' => 'cancelled', 'note' => 'Dibatalkan oleh pembeli.']);
        return response()->json(['message' => 'Pesanan berhasil dibatalkan.']);
    } }",
    $c
);
file_put_contents($f, $c);
