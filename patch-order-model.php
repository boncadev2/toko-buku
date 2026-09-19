<?php
$file = 'backend/app/Models/Order.php';
$content = file_get_contents($file);

$bootMethod = "
    protected static function booted(): void
    {
        static::updated(function (Order \$order) {
            if (\$order->isDirty('status') && \$order->status === 'paid') {
                foreach (\$order->items as \$item) {
                    if (\$item->book_id) {
                        Book::where('id', \$item->book_id)->increment('sold_count', \$item->quantity);
                    }
                }
            }
        });
    }
";

$content = str_replace(
    "class Order extends Model {",
    "class Order extends Model {\n" . $bootMethod,
    $content
);

file_put_contents($file, $content);
