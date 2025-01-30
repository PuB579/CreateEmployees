<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'dept_no',
        'dept_name',
    ];

    // ความสัมพันธ์กับ dept_emp
    public function deptEmp()
    {
        return $this->hasMany(DeptEmp::class, 'dept_no', 'dept_no');
    }
}


