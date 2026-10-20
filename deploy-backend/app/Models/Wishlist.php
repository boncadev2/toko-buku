<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model; use Illuminate\Database\Eloquent\Relations\BelongsTo;
class Wishlist extends Model { protected $fillable=['book_id']; public function book(): BelongsTo { return $this->belongsTo(Book::class); } public function user(): BelongsTo { return $this->belongsTo(User::class); } }
