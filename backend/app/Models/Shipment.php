<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Shipment extends Model { protected $fillable=['order_id','provider','courier','service','cost','tracking_number','status','snapshot']; protected function casts(): array { return ['cost'=>'decimal:2','snapshot'=>'array']; } }
