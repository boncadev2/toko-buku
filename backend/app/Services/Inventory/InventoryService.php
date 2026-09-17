<?php
namespace App\Services\Inventory;
use App\Models\Book; use Illuminate\Database\Eloquent\Model; use Illuminate\Validation\ValidationException;
class InventoryService { public function move(Book $book, int $quantity, string $type, ?Model $reference=null, ?string $note=null): Book { $before=$book->stock; $after=$before+$quantity; if($after<0) throw ValidationException::withMessages(['stock'=>['Stok tidak mencukupi.']]); $book->update(['stock'=>$after]); $book->stockMovements()->create(['type'=>$type,'quantity'=>$quantity,'stock_before'=>$before,'stock_after'=>$after,'reference_type'=>$reference?->getMorphClass(),'reference_id'=>$reference?->getKey(),'note'=>$note]); return $book; } }
