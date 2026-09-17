<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Password;
use Tests\TestCase;

class AuthApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_register_and_receive_a_sanctum_token(): void
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Budi Santoso',
            'email' => 'budi@example.test',
            'phone' => '081234567891',
            'password' => 'Password123',
            'password_confirmation' => 'Password123',
            'device_name' => 'test-suite',
        ]);

        $response->assertCreated()
            ->assertJsonPath('data.user.email', 'budi@example.test')
            ->assertJsonPath('data.user.status', 'active')
            ->assertJsonPath('data.token_type', 'Bearer')
            ->assertJsonStructure(['data' => ['token']]);

        $this->assertDatabaseHas('users', ['email' => 'budi@example.test', 'phone' => '081234567891']);
        $this->assertDatabaseCount('personal_access_tokens', 1);
    }

    public function test_user_can_login_with_email_or_phone(): void
    {
        $user = User::factory()->create(['phone' => '081234567892', 'password' => 'Password123']);

        foreach ([$user->email, $user->phone] as $login) {
            $this->postJson('/api/auth/login', [
                'login' => $login,
                'password' => 'Password123',
            ])->assertOk()->assertJsonPath('data.user.id', $user->id);
        }
    }

    public function test_inactive_user_cannot_login(): void
    {
        $user = User::factory()->create(['status' => 'inactive', 'password' => 'Password123']);

        $this->postJson('/api/auth/login', [
            'login' => $user->email,
            'password' => 'Password123',
        ])->assertUnprocessable()->assertJsonValidationErrors('login');
    }

    public function test_authenticated_user_can_read_profile_and_logout_current_token(): void
    {
        $user = User::factory()->create();
        $token = $user->createToken('test-suite')->plainTextToken;

        $this->withToken($token)->getJson('/api/auth/me')
            ->assertOk()
            ->assertJsonPath('data.id', $user->id);

        $this->withToken($token)->postJson('/api/auth/logout')
            ->assertOk();

        $this->assertDatabaseCount('personal_access_tokens', 0);
        app('auth')->forgetGuards();

        $this->withToken($token)->getJson('/api/auth/me')->assertUnauthorized();
    }

    public function test_password_reset_link_and_reset_password_work(): void
    {
        Notification::fake();
        $user = User::factory()->create(['password' => 'Password123']);

        $this->postJson('/api/auth/forgot-password', ['email' => $user->email])->assertOk();
        Notification::assertSentTo($user, ResetPassword::class);

        $token = Password::createToken($user);

        $this->postJson('/api/auth/reset-password', [
            'email' => $user->email,
            'token' => $token,
            'password' => 'NewPassword123',
            'password_confirmation' => 'NewPassword123',
        ])->assertOk();

        $this->postJson('/api/auth/login', [
            'login' => $user->email,
            'password' => 'NewPassword123',
        ])->assertOk();
    }

    public function test_login_is_rate_limited(): void
    {
        $payload = ['login' => fake()->uuid().'@example.test', 'password' => 'Password123'];

        foreach (range(1, 5) as $attempt) {
            $this->postJson('/api/auth/login', $payload)->assertUnprocessable();
        }

        $this->postJson('/api/auth/login', $payload)->assertTooManyRequests();
    }
}
