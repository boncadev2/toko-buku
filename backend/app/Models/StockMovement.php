<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class StockMovement extends Model { protected $fillable=['book_id','type','quantity','stock_before','stock_after','reference_type','reference_id','note']; public function reference() { return $this->morphTo(); } }
