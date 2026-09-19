<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Payment extends Model { protected $fillable=['order_id','provider','reference','status','amount','payload','paid_at']; protected function casts(): array { return ['amount'=>'decimal:2','payload'=>'array','paid_at'=>'datetime']; } public function order() { return $this->belongsTo(Order::class); } }
