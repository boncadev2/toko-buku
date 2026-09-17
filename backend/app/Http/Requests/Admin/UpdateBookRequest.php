<?php

namespace App\Http\Requests\Admin;

use Illuminate\Validation\Rule;

class UpdateBookRequest extends StoreBookRequest
{
    public function rules(): array
    {
        $book = $this->route('book');
        $rules = $this->bookRules();
        foreach ($rules as $field => $set) {
            $rules[$field] = array_map(fn ($rule) => $rule === 'required' ? 'sometimes' : $rule, $set);
        }

return array_merge($rules, ['category_id' => ['sometimes', 'integer', 'exists:categories,id'], 'sku' => ['sometimes', 'string', 'max:255', Rule::unique('books', 'sku')->ignore($book)], 'slug' => ['sometimes', 'string', 'max:255', Rule::unique('books', 'slug')->ignore($book)], 'title' => ['sometimes', 'string', 'max:255'], 'remove_image_ids' => ['nullable', 'array'], 'remove_image_ids.*' => ['integer']]);
    }
}
