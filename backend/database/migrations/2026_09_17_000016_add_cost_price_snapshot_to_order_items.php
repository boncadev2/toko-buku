<?php
use Illuminate\Database\Migrations\Migration; use Illuminate\Database\Schema\Blueprint; use Illuminate\Support\Facades\Schema;
return new class extends Migration { public function up(): void { Schema::table('order_items', function(Blueprint $t): void { $t->decimal('cost_price_snapshot',15,2)->default(0)->after('unit_price'); }); } public function down(): void { Schema::table('order_items', function(Blueprint $t): void { $t->dropColumn('cost_price_snapshot'); }); } };
