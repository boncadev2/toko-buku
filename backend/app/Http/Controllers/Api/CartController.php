<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller; use App\Services\Cart\CartService; use Illuminate\Http\Request; use Illuminate\Support\Str;
class CartController extends Controller {
 public function __construct(private readonly CartService $service) {}
 private function identity(Request $r): array { $u=$r->user('sanctum'); return [$u,$u?null:($r->header('X-Cart-Token')?: (string) Str::uuid())]; }
 private function response($cart, ?string $token, int $status=200) { return response()->json(['data'=>$this->service->payload($cart),'meta'=>['cart_token'=>$token]],$status); }
 public function show(Request $r) { [$u,$t]=$this->identity($r); return $this->response($this->service->cart($u,$t),$t); }
 public function store(Request $r) { $d=$r->validate(['book_id'=>['required','integer','exists:books,id'],'quantity'=>['required','integer','min:1','max:10']]); [$u,$t]=$this->identity($r); return $this->response($this->service->add($this->service->cart($u,$t),$d['book_id'],$d['quantity']),$t,201); }
 public function update(Request $r, int $item) { $d=$r->validate(['quantity'=>['required','integer','min:1','max:10']]); [$u,$t]=$this->identity($r); return $this->response($this->service->update($this->service->cart($u,$t),$item,$d['quantity']),$t); }
 public function destroy(Request $r, int $item) { [$u,$t]=$this->identity($r); return $this->response($this->service->remove($this->service->cart($u,$t),$item),$t); }
}
