<?php
$file = 'backend/app/Services/Order/OrderService.php';
$content = file_get_contents($file);
$content = str_replace(
  "\$sub=\$book->price*\$item->quantity;",
  "\$sub=\$book->final_price*\$item->quantity; \$totalDiscount += (\$book->price - \$book->final_price) * \$item->quantity;",
  $content
);
$content = str_replace(
  "\$order->items()->create(['book_id'=>\$book->id,'sku'=>\$book->sku,'title'=>\$book->title,'author'=>\$book->author,'unit_price'=>\$book->price,'quantity'=>\$item->quantity,'subtotal'=>\$sub]);",
  "\$order->items()->create(['book_id'=>\$book->id,'sku'=>\$book->sku,'title'=>\$book->title,'author'=>\$book->author,'unit_price'=>\$book->final_price,'quantity'=>\$item->quantity,'subtotal'=>\$sub]);",
  $content
);
$content = str_replace(
  "\$total=0;",
  "\$total=0; \$totalDiscount=0;",
  $content
);
$content = str_replace(
  "\$order->update(['subtotal'=>\$total,'grand_total'=>\$total]);",
  "\$order->update(['subtotal'=>\$total + \$totalDiscount, 'discount_total'=>\$totalDiscount, 'grand_total'=>\$total]);",
  $content
);
file_put_contents($file, $content);
