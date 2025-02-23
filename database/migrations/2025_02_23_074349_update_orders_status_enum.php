<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::table('orders', function (Blueprint $table) {
            \DB::statement("ALTER TABLE orders MODIFY status ENUM('pending', 'shipped', 'completed', 'canceled', 'processing') NOT NULL;");
        });
    }

    public function down() {
        Schema::table('orders', function (Blueprint $table) {
            \DB::statement("ALTER TABLE orders MODIFY status ENUM('pending', 'shipped', 'completed', 'canceled') NOT NULL;");
        });
    }
};
