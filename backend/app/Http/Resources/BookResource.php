<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class BookResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return ['id' => $this->id, 'category_id' => $this->category_id, 'sku' => $this->sku, 'slug' => $this->slug, 'title' => $this->title, 'author' => $this->author, 'publisher' => $this->publisher, 'publication_year' => $this->publication_year, 'isbn' => $this->isbn, 'pages' => $this->pages, 'short_description' => $this->short_description, 'description' => $this->description, 'cost_price' => $this->cost_price, 'price' => $this->price, 'discount_type' => $this->discount_type, 'discount_value' => $this->discount_value, 'discount_start_at' => $this->discount_start_at, 'discount_end_at' => $this->discount_end_at, 'weight' => $this->weight, 'length' => $this->length, 'width' => $this->width, 'height' => $this->height, 'stock' => $this->stock, 'minimum_stock' => $this->minimum_stock, 'cover_image' => $this->cover_image, 'cover_image_url' => $this->cover_image ? Storage::disk('public')->url($this->cover_image) : null, 'is_featured' => $this->is_featured, 'is_active' => $this->is_active, 'views_count' => $this->views_count, 'sold_count' => $this->sold_count, 'category' => $this->whenLoaded('category', fn () => ['id' => $this->category->id, 'name' => $this->category->name, 'slug' => $this->category->slug]), 'images' => BookImageResource::collection($this->whenLoaded('images')), 'created_at' => $this->created_at, 'updated_at' => $this->updated_at];
    }
}
