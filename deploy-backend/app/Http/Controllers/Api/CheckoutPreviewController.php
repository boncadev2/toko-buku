<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller; use App\Models\Address; use App\Services\Cart\CartService; use Illuminate\Http\Request; use Illuminate\Support\Str; use Illuminate\Validation\ValidationException;
class CheckoutPreviewController extends Controller {
 public function __construct(private readonly CartService $carts) {}
 public function __invoke(Request $r) {
  $d=$r->validate(['address_id'=>['nullable','integer'],'item_ids'=>['required','array','min:1'],'item_ids.*'=>['integer'],'guest_address'=>['nullable','array'],'guest_address.recipient_name'=>['required_with:guest_address','string','max:100'],'guest_address.phone'=>['required_with:guest_address','string','max:30'],'guest_address.address_line_1'=>['required_with:guest_address','string','max:500'],'guest_address.city'=>['required_with:guest_address','string','max:100'],'guest_address.province'=>['required_with:guest_address','string','max:100'],'guest_address.postal_code'=>['required_with:guest_address','string','max:15']]);
  $user=$r->user('sanctum'); $token=$user?null:($r->header('X-Cart-Token')?: (string) Str::uuid()); $cart=$this->carts->cart($user,$token)->load('items.book');
  $selected=$cart->items->whereIn('id',$d['item_ids'])->values();
  if ($selected->isEmpty()) throw ValidationException::withMessages(['cart'=>['Pilih minimal satu buku.']]);
  foreach($selected as $item) if(!$item->book->is_active || $item->quantity>$item->book->stock) throw ValidationException::withMessages(['cart'=>['Salah satu buku tidak tersedia atau stok berubah.']]);
  $address=isset($d['guest_address'])?$d['guest_address']:($user&&isset($d['address_id'])?Address::where('user_id',$user->id)->findOrFail($d['address_id'])->only(['recipient_name','phone','address_line_1','city','province','postal_code']):null);
  if(!$address) throw ValidationException::withMessages(['address'=>['Alamat pengiriman wajib dipilih atau diisi.']]);
  $payload=$this->carts->payload($cart); $items=collect($payload['items'])->whereIn('id',$d['item_ids'])->values(); $subtotal=$items->sum('subtotal'); $shipping=0; return response()->json(['data'=>['items'=>$items,'subtotal'=>$subtotal,'discount'=>0,'shipping_cost'=>$shipping,'grand_total'=>$subtotal+$shipping,'shipping_address'=>$address],'meta'=>['cart_token'=>$token]]);
 }
}
