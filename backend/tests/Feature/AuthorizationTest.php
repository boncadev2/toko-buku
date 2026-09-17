<?php

namespace Tests\Feature;

use App\Http\Middleware\EnsureUserHasPermission;
use App\Models\Book;
use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Tests\TestCase;

class AuthorizationTest extends TestCase
{
    use RefreshDatabase;

    public function test_permission_is_resolved_through_user_roles(): void
    {
        $permission = Permission::query()->create([
            'name' => 'catalog.create',
            'display_name' => 'Buat buku',
            'group' => 'catalog',
        ]);
        $role = Role::query()->create(['name' => 'editor', 'display_name' => 'Editor']);
        $role->permissions()->attach($permission);
        $user = User::factory()->create();
        $user->roles()->attach($role);

        $this->assertTrue($user->hasPermission('catalog.create'));
        $this->assertFalse($user->hasPermission('finance.view'));
    }

    public function test_permission_middleware_allows_only_authorized_users(): void
    {
        $authorized = User::factory()->create();
        $denied = User::factory()->create();
        $permission = Permission::query()->create([
            'name' => 'catalog.update',
            'display_name' => 'Ubah buku',
            'group' => 'catalog',
        ]);
        $role = Role::query()->create(['name' => 'catalog-editor', 'display_name' => 'Catalog Editor']);
        $role->permissions()->attach($permission);
        $authorized->roles()->attach($role);
        $middleware = app(EnsureUserHasPermission::class);

        foreach ([[$authorized, 204], [$denied, 403]] as [$user, $status]) {
            $request = Request::create('/api/test', 'GET');
            $request->setUserResolver(fn () => $user);

            $response = $middleware->handle($request, fn () => response()->noContent(), 'catalog.update');

            $this->assertSame($status, $response->getStatusCode());
        }
    }

    public function test_book_policy_uses_catalog_permissions(): void
    {
        $user = User::factory()->create();
        $book = Book::factory()->create();
        $permission = Permission::query()->create([
            'name' => 'catalog.update',
            'display_name' => 'Ubah buku',
            'group' => 'catalog',
        ]);
        $role = Role::query()->create(['name' => 'catalog-manager', 'display_name' => 'Catalog Manager']);
        $role->permissions()->attach($permission);

        $this->assertFalse(Gate::forUser($user)->allows('update', $book));

        $user->roles()->attach($role);

        $this->assertTrue(Gate::forUser($user)->allows('update', $book));
    }

    public function test_super_admin_permissions_are_assigned_by_seeder(): void
    {
        $this->seed(DatabaseSeeder::class);
        $superAdmin = User::factory()->create();
        $superAdmin->roles()->attach(Role::query()->where('name', 'super-admin')->firstOrFail());

        $this->assertTrue($superAdmin->hasPermission('catalog.delete'));
        $this->assertTrue($superAdmin->hasPermission('finance.view'));
        $this->assertTrue($superAdmin->hasPermission('settings.update'));
    }
}
