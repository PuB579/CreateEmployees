<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\DeptEmp;  // เพิ่มการนำเข้า DeptEmp
use App\Models\Department;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = $request->input('search'); // รับค่าค้นหาจาก URL

        // ดึงข้อมูลพนักงานโดยไม่โหลดแผนก
        $employees = Employee::when($query, function ($queryBuilder, $query) {
            $queryBuilder->where('last_name', 'like', '%' . $query . '%');
        })
        ->paginate(10); // แสดงข้อมูลแบบ paginate 10 รายการต่อหน้า

        // ส่งข้อมูลไปยังหน้า view
        return Inertia::render('Employee/index', [
            'employees' => $employees,
            'query' => $query, // ส่งคำค้นหากลับไปที่ view
        ]);
    }

    /**
     * Show the form for creating a new employee.
     */
    public function create()
    {
        // ดึงข้อมูลแผนกทั้งหมด
        $departments = Department::all();

        return Inertia::render('Employee/Create', [
            'departments' => $departments, // ส่งข้อมูลแผนกไปที่ frontend
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //ตรวจสอบข้อมููลว่าตรงตามที่เราต้องการหรือไม่หากไม่ก็จะขึ้น error
        $request->validate([
            'first_name' => 'required|string|max:14',
            'last_name' => 'required|string|max:16',
            'gender' => 'required|in:M,F',
            'birth_date' => 'required|date',
            'hire_date' => 'required|date',
            'dept_no' => 'required|string',
            'profile_image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048' // 
        ]);
        //ระบุว่ารูปนั้นถูกดึงมาโชว์จากตรงไหน
        $imagePath = null;
        if ($request->hasFile('profile_image')) {
            $file = $request->file('profile_image');
            $imagePath = $file->store('employee_images', 'public');

            //ระบุข้อมูลการอัพโหลดรูปภาพ
            \Log::info('Image upload details', [
                'original_name' => $file->getClientOriginalName(),
                'mime_type' => $file->getMimeType(),
                'size' => $file->getSize(),
                'stored_path' => $imagePath
            ]);
        }
        
        // สร้างพนักงานใหม่ (ไม่ต้องส่ง emp_no(id) เพราะมันจะถูกสร้างโดยฐานข้อมูล)
        $employee = Employee::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'gender' => $request->gender,
            'birth_date' => $request->birth_date,
            'hire_date' => $request->hire_date,
            'profile_image' => $imagePath
        ]);

        // ตรวจสอบว่า emp_no(id) ถูกสร้างแล้ว
        if (!$employee->emp_no) {
        //ส่งการตอบกลับหลังจากสร้างพนักงานสำเร็จ
        return redirect()->route('employee.index')->with('success', 'Employee added successfully!');
        }

        // เพิ่มข้อมูลในตาราง dept_emp
        DeptEmp::create([
            'emp_no' => $employee->emp_no,  // ใช้ emp_no ที่ถูกสร้างโดยฐานข้อมูล
            'dept_no' => $request->dept_no,
            'from_date' => $request->hire_date,
            'to_date' => null,  // กำหนด to_date เป็น null ถ้ายังทำงานอยู่
        ]);

    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        // ลบข้อมูลพนักงาน
        $employee->delete();

        // Redirect back with success message
        return redirect()->route('employee.index')->with('flash', [
            'success' => 'Employee deleted successfully!'
        ]);
    }
}
