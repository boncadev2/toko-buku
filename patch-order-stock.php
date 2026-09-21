<?php
$f = 'backend/app/Models/Order.php';
$c = file_get_contents($f);

$oldBooted = <<<'CODE'
    protected static function booted(): void
    {
        static::updated(function (Order $order) {
            if ($order->isDirty('status') && $order->status === 'paid') {
                foreach ($order->items as $item) {
                    if ($item->book_id) {
                        Book::where('id', $item->book_id)->increment('sold_count', $item->quantity);
                    }
                }
            }
        });
    }
CODE;

$newBooted = <<<'CODE'
    protected static function booted(): void
    {
        static::updated(function (Order $order) {
            if ($order->isDirty('status')) {
                if ($order->status === 'paid') {
                    foreach ($order->items as $item) {
                        if ($item->book_id) {
                            Book::where('id', $item->book_id)->increment('sold_count', $item->quantity);
                        }
                    }
                }

                $failedStatuses = ['cancelled', 'expired', 'refunded'];
                if (in_array($order->status, $failedStatuses) && !in_array($order->getOriginal('status'), $failedStatuses)) {
                    $inventory = app(\App\Services\Inventory\InventoryService::class);
                    foreach ($order->items as $item) {
                        if ($item->book_id) {
                            $book = Book::find($item->book_id);
                            if ($book) {
                                $inventory->move($book, $item->quantity, 'restock', $order, 'Pengembalian stok (' . $order->status . ')');
                            }
                        }
                    }
                }
            }
        });
    }
CODE;

$c = str_replace($oldBooted, $newBooted, $c);
file_put_contents($f, $c);
