<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeptEmp extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'dept_emp';  // ตั้งชื่อตารางที่ใช้ในฐานข้อมูลเป็น dept_emp

    protected $fillable = [
        'emp_no',
        'dept_no',
        'from_date',
        'to_date',
    ];

    // ความสัมพันธ์กับ Employee
    public function employee()
    {
        return $this->belongsTo(Employee::class, 'emp_no', 'emp_no');
    }

    // ความสัมพันธ์กับ Department
    public function department()
    {
        return $this->belongsTo(Department::class, 'dept_no', 'dept_no');
    }
}

