<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
{
    Schema::table('products', function (Blueprint $table) {
        if (!Schema::hasColumn('products', 'description')) { // ตรวจสอบก่อนเพิ่ม
            $table->text('description')->nullable()->after('name');
        }
    });
}


    public function down()
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn('description'); // ลบออกถ้า rollback
        });
    }
};
