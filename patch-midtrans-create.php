<?php
$f = 'backend/app/Http/Controllers/Api/MidtransController.php';
$c = file_get_contents($f);

$c = str_replace(
    "\$result=\$this->gateway->create(\$order);",
    "abort_unless(in_array(\$order->status, ['pending_payment', 'manual_payment']), 400, 'Pesanan ini tidak dapat dibayar lagi.');\n        \$result=\$this->gateway->create(\$order);",
    $c
);
file_put_contents($f, $c);
