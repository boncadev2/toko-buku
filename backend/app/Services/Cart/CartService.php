<?php

namespace App\Services\Cart;

use App\Models\Book;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class CartService
{
    public function cart(?User $user, ?string $guestToken): Cart
    {
        if ($user) return Cart::firstOrCreate(['user_id' => $user->id]);
        if (! $guestToken) throw ValidationException::withMessages(['cart_token' => ['Cart token wajib untuk tamu.']]);
        return Cart::firstOrCreate(['guest_token' => $guestToken]);
    }
    public function add(Cart $cart, int $bookId, int $quantity): Cart
    {
        $book = Book::query()->where('is_active', true)->findOrFail($bookId);
        $item = $cart->items()->firstOrNew(['book_id' => $book->id]);
        $newQuantity = ($item->exists ? $item->quantity : 0) + $quantity;
        $this->ensureStock($book, $newQuantity);
        $item->quantity = $newQuantity; $item->save();
        return $this->load($cart);
    }
    public function update(Cart $cart, int $itemId, int $quantity): Cart
    {
        $item = $cart->items()->with('book')->findOrFail($itemId);
        $this->ensureStock($item->book, $quantity); $item->update(['quantity' => $quantity]);
        return $this->load($cart);
    }
    public function remove(Cart $cart, int $itemId): Cart { $cart->items()->findOrFail($itemId)->delete(); return $this->load($cart); }
    public function merge(User $user, ?string $guestToken): void
    {
        if (! $guestToken || ! ($guest = Cart::where('guest_token', $guestToken)->first())) return;
        DB::transaction(function () use ($user, $guest): void { $target = Cart::firstOrCreate(['user_id' => $user->id]); foreach ($guest->items as $item) { $existing = $target->items()->firstOrNew(['book_id' => $item->book_id]); $existing->quantity = min(($existing->exists ? $existing->quantity : 0) + $item->quantity, $item->book->stock); $existing->save(); } $guest->delete(); });
    }
    public function payload(Cart $cart): array { $cart = $this->load($cart); $items = $cart->items->map(fn (CartItem $item) => ['id' => $item->id, 'book_id' => $item->book_id, 'title' => $item->book->title, 'quantity' => $item->quantity, 'unit_price' => $item->book->price, 'subtotal' => round((float) $item->book->price * $item->quantity, 2)]); return ['id' => $cart->id, 'guest_token' => $cart->guest_token, 'items' => $items, 'subtotal' => $items->sum(fn ($item) => (float) $item['subtotal'])]; }
    private function load(Cart $cart): Cart { return $cart->load(['items.book']); }
    private function ensureStock(Book $book, int $quantity): void { if ($quantity > $book->stock) throw ValidationException::withMessages(['quantity' => ['Jumlah melebihi stok tersedia.']]); }
}
