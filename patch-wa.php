<?php
$file = 'backend/app/Http/Controllers/Api/WhatsAppController.php';
$content = file_get_contents($file);
$originalMessage = "\$message=\"Halo Bukupagi, saya ingin menanyakan order {\$order->number}.\\n{\$lines}\\nTotal: Rp\".number_format(\$order->grand_total,0,',','.');";
$newMessage = "\$addressLine = \$order->recipient_name . \" - \" . \$order->phone . \"\\n\" . \$order->address_line_1 . \", \" . \$order->city . \", \" . \$order->province . \" \" . \$order->postal_code;
        \$message=\"Halo, saya ingin memproses pesanan saya:\\n\\n*Order ID:* {\$order->number}\\n\\n*Daftar Pesanan:*\\n{\$lines}\\n\\n*Total Tagihan:* Rp\".number_format(\$order->grand_total,0,',','.').\"\\n\\n*Alamat Pengiriman:*\\n{\$addressLine}\\n\\nMohon info untuk pembayarannya. Terima kasih.\";";
$content = str_replace($originalMessage, $newMessage, $content);
file_put_contents($file, $content);
