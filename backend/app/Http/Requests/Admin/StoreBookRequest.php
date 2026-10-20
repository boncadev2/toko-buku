<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return array_merge($this->bookRules(), ['category_id' => ['required', 'integer', 'exists:categories,id'], 'sku' => ['required', 'string', 'max:255', 'unique:books,sku'], 'slug' => ['required', 'string', 'max:255', 'unique:books,slug'], 'title' => ['required', 'string', 'max:255']]);
    }

    protected function bookRules(): array
    {
        return ['author' => ['nullable', 'string', 'max:255'], 'publisher' => ['nullable', 'string', 'max:255'], 'publication_year' => ['nullable', 'integer', 'min:1000', 'max:9999'], 'isbn' => ['nullable', 'string', 'max:32'], 'pages' => ['nullable', 'integer', 'min:1'], 'short_description' => ['nullable', 'string'], 'description' => ['nullable', 'string'], 'cost_price' => ['required', 'numeric', 'min:0'], 'price' => ['required', 'numeric', 'min:0'], 'discount_type' => ['nullable', 'in:percentage,fixed'], 'discount_value' => ['nullable', 'numeric', 'min:0'], 'discount_start_at' => ['nullable', 'date'], 'discount_end_at' => ['nullable', 'date', 'after_or_equal:discount_start_at'], 'weight' => ['nullable', 'numeric', 'min:0'], 'length' => ['nullable', 'numeric', 'min:0'], 'width' => ['nullable', 'numeric', 'min:0'], 'height' => ['nullable', 'numeric', 'min:0'], 'stock' => ['required', 'integer', 'min:0'], 'minimum_stock' => ['required', 'integer', 'min:0'], 'is_featured' => ['sometimes', 'boolean'], 'is_active' => ['sometimes', 'boolean'], 'cover_image' => ['nullable', 'file', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'], 'gallery_images' => ['nullable', 'array', 'max:10'], 'gallery_images.*' => ['file', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120']];
    }
}
