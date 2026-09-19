<?php
$file = 'backend/app/Services/Cart/CartService.php';
$content = file_get_contents($file);
$content = str_replace(
  "'unit_price' => \$item->book->price, 'subtotal' => round((float) \$item->book->price * \$item->quantity, 2)",
  "'unit_price' => \$item->book->final_price, 'original_price' => \$item->book->final_price < \$item->book->price ? \$item->book->price : null, 'subtotal' => round((float) \$item->book->final_price * \$item->quantity, 2)",
  $content
);
file_put_contents($file, $content);
