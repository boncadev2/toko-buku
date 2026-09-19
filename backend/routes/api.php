<?php

use App\Http\Controllers\Api\AdminBookController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\CheckoutPreviewController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\WhatsAppController;
use App\Http\Controllers\Api\AccountController;
use App\Http\Controllers\Api\WishlistController;
use App\Http\Controllers\Api\AdminOrderController;
use App\Http\Controllers\Api\AdminDashboardController;
use App\Http\Controllers\Api\AnalyticsController;
use App\Http\Controllers\Api\AdminFinanceReportController;
use App\Http\Controllers\Api\InvoiceController;
use App\Http\Controllers\Api\AdminCustomerController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\SettingController;
use App\Http\Controllers\Api\PublicCatalogController;
use App\Http\Controllers\Api\MidtransController;
use App\Http\Controllers\Api\ShippingQuoteController;
use App\Http\Controllers\Api\ShippingAreaController;
use App\Http\Controllers\Api\AccountAddressController;
use Illuminate\Support\Facades\Route;

Route::get('/health', static fn () => response()->json([
    'data' => [
        'service' => config('app.name'),
        'status' => 'ok',
        'version' => '1.0.0',
    ],
]));

Route::prefix('auth')->group(function (): void {
    Route::post('/register', [AuthController::class, 'register'])->middleware('throttle:auth');
    Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:auth');
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword'])->middleware('throttle:password-reset');
    Route::post('/reset-password', [AuthController::class, 'resetPassword'])->middleware('throttle:password-reset');

    Route::middleware('auth:sanctum')->group(function (): void {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);
    });
});

Route::prefix('cart')->group(function (): void {
    Route::get('/', [CartController::class, 'show']);
    Route::post('/items', [CartController::class, 'store']);
    Route::patch('/items/{item}', [CartController::class, 'update']);
    Route::delete('/items/{item}', [CartController::class, 'destroy']);
});

Route::post('/checkout/preview', CheckoutPreviewController::class);
Route::post('/shipping/quote', ShippingQuoteController::class);
Route::get('/shipping/areas', ShippingAreaController::class);
Route::post('/checkout', [OrderController::class, 'store']);
Route::post('/orders/{order}/whatsapp', [WhatsAppController::class, 'order']);
Route::post('/orders/{order}/cancel', [OrderController::class, 'cancel']);
Route::prefix('account')->middleware('auth:sanctum')->group(function (): void { Route::get('/', [AccountController::class, 'dashboard']); Route::get('/orders', [AccountController::class, 'orders']); Route::post('/addresses', [AccountAddressController::class, 'store']); Route::put('/addresses/{address}', [AccountAddressController::class, 'update']); Route::delete('/addresses/{address}', [AccountAddressController::class, 'destroy']); });
Route::prefix('account/wishlist')->middleware('auth:sanctum')->group(function (): void { Route::get('/', [WishlistController::class, 'index']); Route::post('/', [WishlistController::class, 'store']); Route::delete('/{wishlist}', [WishlistController::class, 'destroy']); });
Route::prefix('admin/orders')->middleware('auth:sanctum')->group(function (): void { Route::get('/', [AdminOrderController::class, 'index'])->middleware('permission:order.view'); Route::get('/{order}', [AdminOrderController::class, 'show'])->middleware('permission:order.view'); Route::patch('/{order}/status', [AdminOrderController::class, 'updateStatus'])->middleware('permission:order.update'); });
Route::get('/admin/dashboard', AdminDashboardController::class)->middleware(['auth:sanctum','permission:order.view']);
Route::post('/analytics/events', [AnalyticsController::class, 'store'])->middleware('throttle:60,1');
Route::get('/admin/reports/finance', AdminFinanceReportController::class)->middleware(['auth:sanctum','permission:finance.view']);
Route::get('/orders/{order}/invoice', [InvoiceController::class, 'show']);
Route::prefix('admin/customers')->middleware(['auth:sanctum','permission:customer.view'])->group(function (): void { Route::get('/', [AdminCustomerController::class, 'index']); Route::get('/{customer}', [AdminCustomerController::class, 'show']); });
Route::post('/reviews', [ReviewController::class, 'store'])->middleware('auth:sanctum');
Route::patch('/admin/reviews/{review}', [ReviewController::class, 'moderate'])->middleware(['auth:sanctum','permission:catalog.update']);
Route::get('/settings', [SettingController::class, 'public']);
Route::put('/admin/settings', [SettingController::class, 'update'])->middleware(['auth:sanctum','permission:settings.update']);
Route::post('/admin/settings', [SettingController::class, 'update'])->middleware(['auth:sanctum','permission:settings.update']);
Route::get('/books', [PublicCatalogController::class, 'books']);
Route::get('/books/{book:slug}', [PublicCatalogController::class, 'show']);
Route::get('/categories', [PublicCatalogController::class, 'categories']);
Route::get('/categories/{category:slug}/books', [PublicCatalogController::class, 'categoryBooks']);
Route::get('/search', [PublicCatalogController::class, 'books']);
Route::post('/orders/{order}/payment/midtrans', [MidtransController::class, 'create']);
Route::post('/payments/midtrans/callback', [MidtransController::class, 'callback']);

Route::prefix('admin/books')->middleware('auth:sanctum')->group(function (): void {
    Route::get('/', [AdminBookController::class, 'index'])->middleware('permission:catalog.view');
    Route::post('/', [AdminBookController::class, 'store'])->middleware('permission:catalog.create');
    Route::get('/{book}', [AdminBookController::class, 'show'])->middleware('permission:catalog.view');
    Route::put('/{book}', [AdminBookController::class, 'update'])->middleware('permission:catalog.update');
    Route::delete('/{book}', [AdminBookController::class, 'destroy'])->middleware('permission:catalog.delete');
    Route::post('/{book}/restore', [AdminBookController::class, 'restore'])->middleware('permission:catalog.restore');
});
