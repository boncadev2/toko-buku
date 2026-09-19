<?php

namespace App\Models;

use Database\Factories\BookFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Book extends Model
{
    /** @use HasFactory<BookFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'category_id', 'sku', 'slug', 'title', 'author', 'publisher', 'publication_year', 'isbn',
        'pages', 'short_description', 'description', 'cost_price', 'price', 'discount_type',
        'discount_value', 'discount_start_at', 'discount_end_at', 'weight', 'length', 'width',
        'height', 'stock', 'minimum_stock', 'cover_image', 'is_featured', 'is_active',
    ];

    protected function casts(): array
    {
        return [
            'publication_year' => 'integer',
            'pages' => 'integer',
            'cost_price' => 'decimal:2',
            'price' => 'decimal:2',
            'discount_value' => 'decimal:2',
            'weight' => 'decimal:2',
            'length' => 'decimal:2',
            'width' => 'decimal:2',
            'height' => 'decimal:2',
            'stock' => 'integer',
            'minimum_stock' => 'integer',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'views_count' => 'integer',
            'sold_count' => 'integer',
            'discount_start_at' => 'datetime',
            'discount_end_at' => 'datetime',
        ];
    }

    public function getFinalPriceAttribute(): float
    {
        $now = now();
        if ($this->discount_type && $this->discount_value > 0) {
            $validStart = !$this->discount_start_at || $this->discount_start_at <= $now;
            $validEnd = !$this->discount_end_at || $this->discount_end_at >= $now;
            if ($validStart && $validEnd) {
                if ($this->discount_type === 'percentage') {
                    return max(0, $this->price - ($this->price * ($this->discount_value / 100)));
                } elseif ($this->discount_type === 'fixed') {
                    return max(0, $this->price - $this->discount_value);
                }
            }
        }
        return (float) $this->price;
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(BookImage::class)->orderBy('sort_order');
    }

    
    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    public function stockMovements(): HasMany
    {
        return $this->hasMany(StockMovement::class);
    }
}
