<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('employees', function (Blueprint $table) {
            $table->increments('emp_no')->change(); // ทำให้ emp_no เพิ่มค่าอัตโนมัติ
        });
    }

    public function down()
    {
        Schema::table('employees', function (Blueprint $table) {
            $table->integer('emp_no')->change(); // คืนค่าเป็น integer ธรรมดา
        });
    }

};
