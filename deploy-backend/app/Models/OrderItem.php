<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class OrderItem extends Model { protected $fillable=['book_id','sku','title','author','unit_price','quantity','subtotal']; }
