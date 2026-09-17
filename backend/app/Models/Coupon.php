<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model; use Illuminate\Database\Eloquent\Relations\HasMany;
class Coupon extends Model { protected $fillable=['code','discount_type','discount_value','minimum_purchase','maximum_discount','usage_limit','per_user_limit','usage_count','starts_at','ends_at','is_active']; protected function casts(): array { return ['discount_value'=>'decimal:2','minimum_purchase'=>'decimal:2','maximum_discount'=>'decimal:2','starts_at'=>'datetime','ends_at'=>'datetime','is_active'=>'boolean']; } public function usages(): HasMany { return $this->hasMany(CouponUsage::class); } }
