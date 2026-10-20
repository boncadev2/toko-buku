<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('addresses', function (Blueprint $table) {
            $table->string('subdistrict')->nullable()->after('address_line_2');
            $table->string('biteship_area_id')->nullable()->after('postal_code')->index();
        });
    }

    public function down(): void
    {
        Schema::table('addresses', function (Blueprint $table) {
            $table->dropIndex(['biteship_area_id']);
            $table->dropColumn(['subdistrict', 'biteship_area_id']);
        });
    }
};
