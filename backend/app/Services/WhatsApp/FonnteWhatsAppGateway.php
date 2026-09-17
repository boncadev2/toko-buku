<?php
namespace App\Services\WhatsApp;
use Illuminate\Support\Facades\Http; use Illuminate\Validation\ValidationException;
class FonnteWhatsAppGateway { public function send(string $target,string $message): array { $token=config('services.fonnte.token'); if(!$token) throw ValidationException::withMessages(['whatsapp'=>['Fonnte token belum dikonfigurasi.']]); $r=Http::baseUrl(config('services.fonnte.base_url'))->withHeaders(['Authorization'=>$token])->asForm()->post('/send',['target'=>$target,'message'=>$message]); $r->throw(); return $r->json(); } }
