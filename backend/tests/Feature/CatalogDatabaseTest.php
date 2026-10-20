<?php

namespace Tests\Feature;

use App\Models\Book;
use App\Models\BookImage;
use App\Models\Category;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CatalogDatabaseTest extends TestCase
{
    use RefreshDatabase;

    public function test_book_belongs_to_category_and_has_ordered_images(): void
    {
        $category = Category::factory()->create();
        $book = Book::factory()->for($category)->create([
            'cost_price' => 50000,
            'price' => 75000,
        ]);
        BookImage::factory()->for($book)->create(['sort_order' => 2]);
        $firstImage = BookImage::factory()->for($book)->create(['sort_order' => 1]);

        $book = $book->fresh(['category', 'images']);

        $this->assertTrue($book->category->is($category));
        $this->assertCount(2, $book->images);
        $this->assertTrue($book->images->first()->is($firstImage));
        $this->assertSame('50000.00', $book->cost_price);
        $this->assertSame('75000.00', $book->price);
    }

    public function test_book_sku_is_unique(): void
    {
        Book::factory()->create(['sku' => 'BK-UNIQUE-001']);

        $this->expectException(QueryException::class);

        Book::factory()->create(['sku' => 'BK-UNIQUE-001']);
    }

    public function test_book_and_category_support_soft_deletes(): void
    {
        $category = Category::factory()->create();
        $book = Book::factory()->for($category)->create();

        $book->delete();
        $category->delete();

        $this->assertSoftDeleted('books', ['id' => $book->id]);
        $this->assertSoftDeleted('categories', ['id' => $category->id]);
        $this->assertNotNull(Book::withTrashed()->find($book->id));
    }
}
