<?php

namespace Tests\Feature;

use App\Models\Address;
use App\Models\Role;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DatabaseFoundationTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_have_roles_and_addresses(): void
    {
        $user = User::factory()->create();
        $role = Role::query()->create([
            'name' => 'customer',
            'display_name' => 'Customer',
        ]);
        $address = Address::factory()->for($user)->create(['is_default' => true]);

        $user->roles()->attach($role);

        $this->assertTrue($user->fresh()->roles->contains($role));
        $this->assertTrue($user->fresh()->addresses->contains($address));
        $this->assertTrue($address->fresh()->user->is($user));
    }

    public function test_role_name_must_be_unique(): void
    {
        Role::query()->create(['name' => 'admin', 'display_name' => 'Admin']);

        $this->expectException(QueryException::class);

        Role::query()->create(['name' => 'admin', 'display_name' => 'Administrator']);
    }

    public function test_database_seeder_creates_customer_role_and_default_address(): void
    {
        $this->seed(DatabaseSeeder::class);

        $customer = User::query()->where('email', 'pelanggan@example.test')->firstOrFail();

        $this->assertTrue($customer->roles()->where('name', 'customer')->exists());
        $this->assertTrue($customer->addresses()->where('is_default', true)->exists());
    }
}
