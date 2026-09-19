<?php
$f = 'backend/app/Http/Controllers/Api/OrderController.php';
$c = file_get_contents($f);
$c = str_replace(
    "return response()->json(['data'=>\$o],201); public function cancel",
    "return response()->json(['data'=>\$o],201); }\n\n    public function cancel",
    $c
);
file_put_contents($f, $c);
