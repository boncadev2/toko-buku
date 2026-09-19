<?php
$file = 'backend/app/Services/Payment/MidtransPaymentGateway.php';
$content = file_get_contents($file);

$original = "\$r=Http::withBasicAuth(\$key,'')->post(\$url,['transaction_details'=>['order_id'=>\$order->number,'gross_amount'=>(int)\$order->grand_total],'customer_details'=>['first_name'=>\$order->recipient_name,'phone'=>\$order->phone]]);";

$modified = "
        \$midtransOrderId = \$order->number . '-' . time();
        \$r=Http::withBasicAuth(\$key,'')->post(\$url,['transaction_details'=>['order_id'=>\$midtransOrderId,'gross_amount'=>(int)\$order->grand_total],'customer_details'=>['first_name'=>\$order->recipient_name,'phone'=>\$order->phone]]);";

$content = str_replace($original, $modified, $content);

$originalReturn = "return ['reference'=>\$order->number,'status'=>'pending','token'=>\$r->json('token'),'redirect_url'=>\$r->json('redirect_url')];";
$modifiedReturn = "return ['reference'=>\$midtransOrderId,'status'=>'pending','token'=>\$r->json('token'),'redirect_url'=>\$r->json('redirect_url')];";

$content = str_replace($originalReturn, $modifiedReturn, $content);

file_put_contents($file, $content);
