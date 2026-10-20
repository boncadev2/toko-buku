<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Role;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AdminBookApiTest extends TestCase
{
    use RefreshDatabase;

    private function admin(): User
    {
        $this->seed(DatabaseSeeder::class);
        $admin = User::factory()->create();
        $admin->roles()->attach(Role::query()->where('name', 'admin')->firstOrFail());
        Sanctum::actingAs($admin);

        return $admin;
    }

    public function test_admin_can_create_filter_update_delete_and_restore_book(): void
    {
        $this->admin();
        $category = Category::factory()->create();
        $payload = ['category_id' => $category->id, 'sku' => 'BK-ADMIN-001', 'slug' => 'buku-admin', 'title' => 'Buku Admin', 'cost_price' => 20000, 'price' => 35000, 'stock' => 8, 'minimum_stock' => 2, 'is_featured' => true, 'is_active' => true];
        $created = $this->postJson('/api/admin/books', $payload)->assertCreated()->assertJsonPath('data.sku', 'BK-ADMIN-001');
        $bookId = $created->json('data.id');
        $this->getJson('/api/admin/books?search=Buku+Admin&is_featured=1')->assertOk()->assertJsonPath('data.0.id', $bookId);
        $this->putJson("/api/admin/books/{$bookId}", ['stock' => 3, 'is_active' => false])->assertOk()->assertJsonPath('data.stock', 3)->assertJsonPath('data.is_active', false);
        $this->deleteJson("/api/admin/books/{$bookId}")->assertNoContent();
        $this->assertSoftDeleted('books', ['id' => $bookId]);
        $this->postJson("/api/admin/books/{$bookId}/restore")->assertOk()->assertJsonPath('data.id', $bookId);
        $this->assertNotSoftDeleted('books', ['id' => $bookId]);
    }

    public function test_customer_cannot_access_admin_books(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);
        $this->getJson('/api/admin/books')->assertForbidden();
    }

    public function test_cover_upload_must_be_an_image(): void
    {
        $this->admin();
        $category = Category::factory()->create();
        $this->post('/api/admin/books', ['category_id' => $category->id, 'sku' => 'BK-FILE-001', 'slug' => 'file-invalid', 'title' => 'File Invalid', 'cost_price' => 20000, 'price' => 30000, 'stock' => 1, 'minimum_stock' => 0, 'cover_image' => UploadedFile::fake()->create('malware.txt', 12, 'text/plain')], ['Accept' => 'application/json'])->assertUnprocessable()->assertJsonValidationErrors('cover_image');
    }
}
