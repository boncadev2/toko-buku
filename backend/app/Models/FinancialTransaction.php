<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class FinancialTransaction extends Model { protected $fillable=['order_id','type','category','amount','reference','description','occurred_at']; protected function casts(): array { return ['amount'=>'decimal:2','occurred_at'=>'datetime']; } }
