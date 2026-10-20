<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model; use Illuminate\Database\Eloquent\Relations\HasMany;
class Order extends Model { protected $fillable=['number','user_id','guest_token','status','recipient_name','phone','address_line_1','city','province','postal_code','subtotal','discount_total','shipping_total','grand_total']; public function items(): HasMany { return $this->hasMany(OrderItem::class); } public function histories(): HasMany { return $this->hasMany(OrderStatusHistory::class); } public function whatsAppClicks(): HasMany { return $this->hasMany(WhatsAppClick::class); } }
