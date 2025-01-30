<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'first_name',
        'last_name',
        'gender',
        'birth_date',
        'hire_date',
        'profile_image' // เพิ่ม profile_image
    ];

    // ความสัมพันธ์กับ dept_emp
    public function deptEmp()
    {
        return $this->hasMany(DeptEmp::class, 'emp_no', 'emp_no');
    }

    // ความสัมพันธ์กับ department ผ่าน dept_emp
    public function department()
    {
        return $this->hasOneThrough(Department::class, DeptEmp::class, 'emp_no', 'dept_no', 'emp_no', 'dept_no');
    }
}

