<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ForgotPasswordRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Http\Resources\UserResource;
use App\Services\Auth\AuthService;
use App\Services\Cart\CartService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct(private readonly AuthService $authService, private readonly CartService $cartService) {}

    public function register(RegisterRequest $request): JsonResponse
    {
        $result = $this->authService->register($request->validated());
        $this->cartService->merge($result['user'], $request->header('X-Cart-Token'));
        return $this->authenticatedResponse($result, 201);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $result = $this->authService->login($request->validated());
        $this->cartService->merge($result['user'], $request->header('X-Cart-Token'));
        return $this->authenticatedResponse($result);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()?->delete();

        return response()->json(['message' => 'Berhasil keluar.']);
    }

    public function me(Request $request): UserResource
    {
        return new UserResource($request->user());
    }

    public function forgotPassword(ForgotPasswordRequest $request): JsonResponse
    {
        $this->authService->sendPasswordResetLink($request->string('email')->toString());

        return response()->json(['message' => 'Jika email terdaftar, tautan reset password telah dikirim.']);
    }

    public function resetPassword(ResetPasswordRequest $request): JsonResponse
    {
        if (! $this->authService->resetPassword($request->validated())) {
            return response()->json(['message' => 'Token reset password tidak valid atau telah kedaluwarsa.'], 422);
        }

        return response()->json(['message' => 'Password berhasil diubah.']);
    }

    private function authenticatedResponse(array $result, int $status = 200): JsonResponse
    {
        return response()->json([
            'data' => [
                'user' => (new UserResource($result['user']))->resolve(),
                'token' => $result['token'],
                'token_type' => 'Bearer',
            ],
        ], $status);
    }
}
