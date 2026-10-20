<?php
namespace App\Services\Finance;
use App\Models\FinancialTransaction; use App\Models\Order;
class FinanceService { public function record(string $type,string $category,float $amount,?Order $order=null,?string $reference=null,?string $description=null): FinancialTransaction { return FinancialTransaction::firstOrCreate(['reference'=>$reference],['order_id'=>$order?->id,'type'=>$type,'category'=>$category,'amount'=>$amount,'description'=>$description,'occurred_at'=>now()]); } }
