<?php
$file = 'backend/app/Models/WhatsAppClick.php';
$content = file_get_contents($file);
$content = str_replace(
    "class WhatsAppClick extends Model { protected \$fillable=['order_id','book_id','guest_token']; }",
    "class WhatsAppClick extends Model { protected \$table = 'whatsapp_clicks'; protected \$fillable=['order_id','book_id','guest_token']; }",
    $content
);
file_put_contents($file, $content);
