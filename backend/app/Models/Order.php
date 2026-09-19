<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model; use Illuminate\Database\Eloquent\Relations\HasMany;
class Order extends Model {

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
 protected $fillable=['number','user_id','guest_token','status','recipient_name','phone','address_line_1','city','province','postal_code','subtotal','discount_total','shipping_total','grand_total']; public function items(): HasMany { return $this->hasMany(OrderItem::class); } public function histories(): HasMany { return $this->hasMany(OrderStatusHistory::class); } public function whatsAppClicks(): HasMany { return $this->hasMany(WhatsAppClick::class); } }
