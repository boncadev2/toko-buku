<?php
use Illuminate\Database\Migrations\Migration; use Illuminate\Database\Schema\Blueprint; use Illuminate\Support\Facades\Schema;
return new class extends Migration { public function up(): void { Schema::create('whatsapp_clicks', function(Blueprint $t): void { $t->id(); $t->foreignId('order_id')->nullable()->constrained()->nullOnDelete(); $t->foreignId('book_id')->nullable()->constrained()->nullOnDelete(); $t->uuid('guest_token')->nullable()->index(); $t->timestamps(); }); } public function down(): void { Schema::dropIfExists('whatsapp_clicks'); } };
