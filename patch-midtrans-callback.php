<?php
$f = 'backend/app/Http/Controllers/Api/MidtransController.php';
$c = file_get_contents($f);
$c = str_replace(
    "if(\$mapped==='paid'&&\$payment->order->status==='pending_payment')",
    "if(\$mapped==='paid'&&in_array(\$payment->order->status, ['pending_payment', 'manual_payment']))",
    $c
);
file_put_contents($f, $c);
