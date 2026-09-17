<?php
namespace App\Services\Finance;
use App\Models\Order;
class MarginService { public function forOrder(Order $order): array { $order->loadMissing('items'); $revenue=(float)$order->items->sum('subtotal'); $cogs=(float)$order->items->sum(fn($i)=>(float)$i->cost_price_snapshot*$i->quantity); return ['revenue'=>$revenue,'cogs'=>$cogs,'gross_profit'=>$revenue-$cogs,'margin_percent'=>$revenue?round((($revenue-$cogs)/$revenue)*100,2):0]; } }
