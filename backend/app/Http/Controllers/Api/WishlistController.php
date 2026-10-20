<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller; use App\Models\Wishlist; use Illuminate\Http\Request;
class WishlistController extends Controller { public function index(Request $r) { return response()->json(['data'=>$r->user()->wishlists()->with('book')->latest()->paginate(12)]); } public function store(Request $r) { $d=$r->validate(['book_id'=>['required','integer','exists:books,id']]); $item=$r->user()->wishlists()->firstOrCreate(['book_id'=>$d['book_id']]); return response()->json(['data'=>$item->load('book')],$item->wasRecentlyCreated?201:200); } public function destroy(Request $r, Wishlist $wishlist) { abort_unless($wishlist->user_id===$r->user()->id,403); $wishlist->delete(); return response()->json(['message'=>'Wishlist dihapus.']); } }
