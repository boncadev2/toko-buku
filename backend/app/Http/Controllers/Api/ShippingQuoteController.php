<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\Cart\CartService;
use App\Services\Shipping\BiteshipShippingProvider;
use App\Services\Shipping\ManualShippingProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Throwable;

class ShippingQuoteController extends Controller
{
    public function __invoke(Request $request, CartService $carts)
    {
        $data = $request->validate([
            'province' => ['required', 'string', 'max:100'],
            'city' => ['required', 'string', 'max:100'],
            'district' => ['nullable', 'string', 'max:100'],
            'postal_code' => ['required', 'string', 'max:15'],
            'area_id' => ['nullable', 'string', 'max:100'],
            'item_ids' => ['nullable', 'array'],
            'item_ids.*' => ['integer'],
        ]);
        $user = $request->user('sanctum');
        $token = $user ? null : ($request->header('X-Cart-Token') ?: (string) Str::uuid());
        $cart = $carts->cart($user, $token)->load('items.book');
        $items = !empty($data['item_ids']) ? $cart->items->whereIn('id', $data['item_ids']) : $cart->items;
        $weight = max(1, (int) $items->sum(fn ($item) => (float) ($item->book->weight ?: 300) * $item->quantity));

        try {
            $quotes = app(BiteshipShippingProvider::class)->quote($data, $weight);
            $source = 'biteship';
        } catch (Throwable) {
            $quotes = app(ManualShippingProvider::class)->quote($data, $weight);
            $source = 'manual';
        }

        return response()->json(['data' => $quotes, 'meta' => ['source' => $source, 'cart_token' => $token]]);
    }
}
