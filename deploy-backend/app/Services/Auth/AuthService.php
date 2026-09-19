<?php

namespace App\Services\Auth;

use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use App\Models\Role;

class AuthService
{
    public function register(array $attributes): array
    {
        $user = User::query()->create([
            'name' => $attributes['name'],
            'email' => $attributes['email'],
            'phone' => $attributes['phone'] ?? null,
            'password' => $attributes['password'],
            'status' => 'active',
        ]);

        if ($role = Role::where('name', 'customer')->first()) {
            $user->roles()->attach($role);
        }

        return ['user' => $user, 'token' => $this->tokenFor($user, $attributes['device_name'] ?? 'api')];
    }

    public function login(array $attributes): array
    {
        $login = trim($attributes['login']);
        $column = filter_var($login, FILTER_VALIDATE_EMAIL) ? 'email' : 'phone';
        $user = User::query()->where($column, $login)->first();

        if (! $user || ! Hash::check($attributes['password'], $user->password)) {
            throw ValidationException::withMessages(['login' => ['Kredensial yang diberikan tidak valid.']]);
        }

        if ($user->status !== 'active') {
            throw ValidationException::withMessages(['login' => ['Akun ini tidak aktif.']]);
        }

        return ['user' => $user, 'token' => $this->tokenFor($user, $attributes['device_name'] ?? 'api')];
    }

    public function sendPasswordResetLink(string $email): void
    {
        Password::sendResetLink(['email' => $email]);
    }

    public function resetPassword(array $attributes): bool
    {
        return Password::reset(
            [
                'email' => $attributes['email'],
                'password' => $attributes['password'],
                'password_confirmation' => $attributes['password_confirmation'],
                'token' => $attributes['token'],
            ],
            function (User $user, string $password): void {
                $user->forceFill(['password' => $password, 'remember_token' => Str::random(60)])->save();
                event(new PasswordReset($user));
            }
        ) === Password::PASSWORD_RESET;
    }

    private function tokenFor(User $user, string $deviceName): string
    {
        return $user->createToken($deviceName)->plainTextToken;
    }
}
