<?php

namespace App\Services\Admin;

use App\Models\Book;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class BookAdminService
{
    public function paginate(array $filters): LengthAwarePaginator
    {
        $query = Book::query()->with(['category', 'images']);
        if (! empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(fn ($q) => $q->where('title', 'like', "%{$search}%")->orWhere('author', 'like', "%{$search}%")->orWhere('publisher', 'like', "%{$search}%")->orWhere('isbn', 'like', "%{$search}%")->orWhere('sku', 'like', "%{$search}%"));
        } foreach (['category_id', 'is_active', 'is_featured'] as $field) {
            if (array_key_exists($field, $filters) && $filters[$field] !== null) {
                $query->where($field, $filters[$field]);
            }
        } if (($filters['stock_status'] ?? null) === 'in_stock') {
            $query->where('stock', '>', 0);
        } if (($filters['stock_status'] ?? null) === 'out_of_stock') {
            $query->where('stock', 0);
        } if (($filters['stock_status'] ?? null) === 'low_stock') {
            $query->whereColumn('stock', '<=', 'minimum_stock');
        }

return $query->orderBy($filters['sort_by'] ?? 'created_at', $filters['sort_direction'] ?? 'desc')->paginate($filters['per_page'] ?? 15)->withQueryString();
    }

    public function create(array $data): Book
    {
        return DB::transaction(function () use ($data) {
            $book = Book::query()->create(Arr::except($data, ['cover_image', 'gallery_images']));
            $this->storeCover($book, $data['cover_image'] ?? null);
            $this->storeGallery($book, $data['gallery_images'] ?? []);

            return $book->fresh(['category', 'images']);
        });
    }

    public function update(Book $book, array $data): Book
    {
        return DB::transaction(function () use ($book, $data) {
            $book->fill(Arr::except($data, ['cover_image', 'gallery_images', 'remove_image_ids']));
            $book->save();
            $this->storeCover($book, $data['cover_image'] ?? null);
            if (! empty($data['remove_image_ids'])) {
                $book->images()->whereIn('id', $data['remove_image_ids'])->get()->each(function ($image) {
                    Storage::disk('public')->delete($image->image_path);
                    $image->delete();
                });
            }$this->storeGallery($book, $data['gallery_images'] ?? []);

            return $book->fresh(['category', 'images']);
        });
    }

    public function delete(Book $book): void
    {
        DB::transaction(fn () => $book->delete());
    }

    public function restore(Book $book): Book
    {
        return DB::transaction(function () use ($book) {
            $book->restore();

            return $book->fresh(['category', 'images']);
        });
    }

    private function storeCover(Book $book, ?UploadedFile $file): void
    {
        if (! $file) {
            return;
        }$previous = $book->cover_image;
        $book->update(['cover_image' => $file->store('books/covers', 'public')]);
        if ($previous) {
            Storage::disk('public')->delete($previous);
        }
    }

    private function storeGallery(Book $book, array $files): void
    {
        $start = (int) $book->images()->max('sort_order') + 1;
        foreach ($files as $file) {
            $book->images()->create(['image_path' => $file->store('books/gallery','public'), 'alt_text' => $book->title, 'sort_order' => $start++]);
        }
    }
}
