<?php

namespace Database\Factories;

use App\Models\Book;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/** @extends Factory<Book> */
class BookFactory extends Factory
{
    protected $model = Book::class;

    public function definition(): array
    {
        $title = fake()->sentence(3);

        return [
            'category_id' => Category::factory(),
            'sku' => 'BK-'.fake()->unique()->numerify('######'),
            'slug' => Str::slug($title).'-'.fake()->unique()->numerify('###'),
            'title' => $title,
            'author' => fake()->name(),
            'publisher' => fake()->company(),
            'publication_year' => fake()->numberBetween(2000, (int) now()->format('Y')),
            'isbn' => fake()->isbn13(),
            'pages' => fake()->numberBetween(80, 600),
            'short_description' => fake()->sentence(),
            'description' => fake()->paragraph(),
            'cost_price' => fake()->numberBetween(20000, 80000),
            'price' => fake()->numberBetween(30000, 120000),
            'weight' => fake()->numberBetween(100, 900),
            'length' => 20,
            'width' => 14,
            'height' => 2,
            'stock' => fake()->numberBetween(1, 50),
            'minimum_stock' => 3,
            'is_featured' => false,
            'is_active' => true,
        ];
    }
}
