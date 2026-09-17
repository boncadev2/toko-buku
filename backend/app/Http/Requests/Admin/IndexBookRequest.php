<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class IndexBookRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return ['search' => ['nullable', 'string', 'max:255'], 'category_id' => ['nullable', 'integer', 'exists:categories,id'], 'is_active' => ['nullable', 'boolean'], 'is_featured' => ['nullable', 'boolean'], 'stock_status' => ['nullable', 'in:in_stock,out_of_stock,low_stock'], 'sort_by' => ['nullable', 'in:title,price,stock,sold_count,created_at'], 'sort_direction' => ['nullable', 'in:asc,desc'], 'per_page' => ['nullable', 'integer', 'min:1', 'max:100']];
    }
}
