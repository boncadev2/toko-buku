<?php
namespace App\Http\Responses;
use Illuminate\Contracts\Pagination\LengthAwarePaginator; use Illuminate\Http\JsonResponse;
class ApiResponse { public static function success(mixed $data=null,int $status=200,array $meta=[]): JsonResponse { return response()->json(array_filter(['data'=>$data,'meta'=>$meta?:null],fn($v)=>$v!==null),$status); } public static function error(string $message,int $status=422,array $errors=[]): JsonResponse { return response()->json(['message'=>$message,'errors'=>$errors?:null],$status); } public static function paginated(LengthAwarePaginator $p): JsonResponse { return self::success($p->items(),200,['pagination'=>['current_page'=>$p->currentPage(),'per_page'=>$p->perPage(),'total'=>$p->total(),'last_page'=>$p->lastPage()]]); } }
