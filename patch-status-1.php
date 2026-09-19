<?php
$f1 = 'backend/app/Http/Controllers/Api/WhatsAppController.php';
$c1 = file_get_contents($f1);
$c1 = str_replace(
    "\$order->whatsAppClicks()->create(['book_id'=>\$item->book_id,'guest_token'=>\$token]);",
    "\$order->whatsAppClicks()->create(['book_id'=>\$item->book_id,'guest_token'=>\$token]);\n        if (\$order->status === 'pending_payment') {\n            \$order->update(['status' => 'manual_payment']);\n            \$order->histories()->create(['status' => 'manual_payment', 'note' => 'Menunggu Pembayaran Manual (WhatsApp)']);\n        }",
    $c1
);
file_put_contents($f1, $c1);

$f2 = 'backend/app/Http/Controllers/Api/AdminOrderController.php';
$c2 = file_get_contents($f2);
$c2 = str_replace(
    "['pending_payment','paid',",
    "['pending_payment','manual_payment','paid',",
    $c2
);
file_put_contents($f2, $c2);

$f3 = 'backend/app/Http/Controllers/Api/AccountController.php';
$c3 = file_get_contents($f3);
$c3 = str_replace(
    "['pending_payment','paid',",
    "['pending_payment','manual_payment','paid',",
    $c3
);
file_put_contents($f3, $c3);
