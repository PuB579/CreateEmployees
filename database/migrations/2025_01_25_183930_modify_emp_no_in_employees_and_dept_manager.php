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
            // แก้ไข emp_no ใน employees ให้เป็น unsigned และ auto increment
            $table->integer('emp_no')->unsigned()->autoIncrement()->change();
        });

        Schema::table('dept_manager', function (Blueprint $table) {
            // เปลี่ยน emp_no ใน dept_manager ให้เป็น unsigned
            $table->integer('emp_no')->unsigned()->change();
        });
    }

    public function down()
    {
        Schema::table('employees', function (Blueprint $table) {
            // คืนค่าเป็นค่าเดิมถ้าต้องการ rollback
            $table->integer('emp_no')->change();
        });

        Schema::table('dept_manager', function (Blueprint $table) {
            $table->integer('emp_no')->change();
        });
    }

};
