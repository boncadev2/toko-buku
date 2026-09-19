<?php
namespace App\Services\Promotion;
use App\Models\Promotion;
class PromotionService { public function discount(Promotion $p, float $subtotal): float { if(!$p->is_active || ($p->starts_at&&$p->starts_at->isFuture()) || ($p->ends_at&&$p->ends_at->isPast()) || ($p->usage_limit!==null&&$p->usage_count>=$p->usage_limit) || $subtotal<$p->minimum_purchase) return 0; $discount=$p->discount_type==='percentage'?$subtotal*((float)$p->discount_value/100):(float)$p->discount_value; return min($discount,(float)($p->maximum_discount??$discount),$subtotal); } }
