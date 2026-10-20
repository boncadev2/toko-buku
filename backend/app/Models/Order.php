<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model; use Illuminate\Database\Eloquent\Relations\HasMany;
class Order extends Model {

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
 protected $fillable=['number','user_id','guest_token','status','recipient_name','phone','address_line_1','city','province','postal_code','subtotal','discount_total','shipping_total','grand_total']; public function items(): HasMany { return $this->hasMany(OrderItem::class); } public function histories(): HasMany { return $this->hasMany(OrderStatusHistory::class); } public function whatsAppClicks(): HasMany { return $this->hasMany(WhatsAppClick::class); } }
