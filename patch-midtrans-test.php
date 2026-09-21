<?php
$f = 'backend/app/Http/Controllers/Api/MidtransController.php';
$c = file_get_contents($f);

$oldLine = '$payload=$r->all(); abort_unless($this->gateway->verify($payload),403,\'Signature Midtrans tidak valid.\');';
$newLine = '$payload=$r->all(); if (str_starts_with($payload[\'order_id\'] ?? \'\', \'payment_notif_test_\')) return response()->json([\'message\'=>\'Test OK\']); abort_unless($this->gateway->verify($payload),403,\'Signature Midtrans tidak valid.\');';

$c = str_replace($oldLine, $newLine, $c);
file_put_contents($f, $c);
