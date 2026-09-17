<?php
use Illuminate\Database\Migrations\Migration; use Illuminate\Database\Schema\Blueprint; use Illuminate\Support\Facades\Schema;
return new class extends Migration {
 public function up(): void {
  Schema::create('orders', function(Blueprint $t): void { $t->id(); $t->string('number')->unique(); $t->foreignId('user_id')->nullable()->constrained()->nullOnDelete(); $t->uuid('guest_token')->nullable()->index(); $t->string('status')->index(); $t->string('recipient_name'); $t->string('phone'); $t->text('address_line_1'); $t->string('city'); $t->string('province'); $t->string('postal_code'); $t->decimal('subtotal',15,2); $t->decimal('discount_total',15,2)->default(0); $t->decimal('shipping_total',15,2)->default(0); $t->decimal('grand_total',15,2); $t->timestamps(); });
  Schema::create('order_items', function(Blueprint $t): void { $t->id(); $t->foreignId('order_id')->constrained()->cascadeOnDelete(); $t->foreignId('book_id')->nullable()->constrained()->nullOnDelete(); $t->string('sku'); $t->string('title'); $t->string('author')->nullable(); $t->decimal('unit_price',15,2); $t->unsignedInteger('quantity'); $t->decimal('subtotal',15,2); $t->timestamps(); });
  Schema::create('order_status_histories', function(Blueprint $t): void { $t->id(); $t->foreignId('order_id')->constrained()->cascadeOnDelete(); $t->string('status'); $t->text('note')->nullable(); $t->timestamps(); });
 }
 public function down(): void { Schema::dropIfExists('order_status_histories'); Schema::dropIfExists('order_items'); Schema::dropIfExists('orders'); }
};
