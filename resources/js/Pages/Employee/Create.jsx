import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function Create({ departments }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        dept_no: '',
        gender: '',
        birthdate: '',
        hire_date: '',
        profile_image: null,  // เพิ่มฟิลด์สำหรับอัพโหลดรูปภาพ
    });

    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // แสดงค่าของฟอร์มใน console ก่อนการส่ง
        console.log(data);

        post('/employee', {
            onSuccess: () => {
                setIsSuccess(true);
                reset();
                Inertia.get('/employee');
            },
            onError: (serverErrors) => {
                console.error('Error:', serverErrors);
                if (serverErrors && serverErrors.message) {
                    alert(`Error: ${serverErrors.message}`);
                }
            },
            // สำหรับการส่งข้อมูลแบบ multipart/form-data (ไฟล์รูปภาพ)
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
    };

    const handleFileChange = (e) => {
        setData('profile_image', e.target.files[0]);  // กำหนดไฟล์รูปภาพที่เลือก
    };


    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Create Employee</h1>

            {isSuccess && (
                <div className="mb-4 p-2 text-green-800 bg-green-100 border border-green-300 rounded-md">
                    Employee added successfully!
                </div>
            )}

            {Object.keys(errors).length > 0 && (
                <div className="mb-4 p-2 text-red-800 bg-red-100 border border-red-300 rounded-md">
                    Please check your form for errors.
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* First Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name:</label>
                    <input
                        type="text"
                        value={data.first_name || ''} // ตรวจสอบค่าเริ่มต้น
                        onChange={(e) => setData('first_name', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter first name"
                    />
                    {errors.first_name && <span className="text-sm text-red-500">{errors.first_name}</span>}
                </div>

                {/* Last Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name:</label>
                    <input
                        type="text"
                        value={data.last_name || ''} // ตรวจสอบค่าเริ่มต้น
                        onChange={(e) => setData('last_name', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter last name"
                    />
                    {errors.last_name && <span className="text-sm text-red-500">{errors.last_name}</span>}
                </div>

                {/* Department */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department:</label>
                    <select
                        value={data.dept_no || ''} // ตรวจสอบค่าเริ่มต้น
                        onChange={(e) => setData('dept_no', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Department</option>
                        {departments.map((dept) => (
                            <option key={dept.dept_no} value={dept.dept_no}>
                                {dept.dept_name}
                            </option>
                        ))}
                    </select>

                    {errors.dept_no && <span className="text-sm text-red-500">{errors.dept_no}</span>}
                </div>

                {/* Gender */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender:</label>
                    <select
                        value={data.gender || ''} // ตรวจสอบค่าเริ่มต้น
                        onChange={(e) => setData('gender', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Gender</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                    </select>
                    {errors.gender && <span className="text-sm text-red-500">{errors.gender}</span>}
                </div>

                {/* Birthdate */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Birthdate:</label>
                    <input
                        type="date"
                        value={data.birth_date || ''} // ตรวจสอบค่าเริ่มต้น
                        onChange={(e) => setData('birth_date', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.birthdate && <span className="text-sm text-red-500">{errors.birthdate}</span>}
                </div>

                {/* Hire Date */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hire Date:</label>
                    <input
                        type="date"
                        value={data.hire_date || ''} // ตรวจสอบค่าเริ่มต้น
                        onChange={(e) => setData('hire_date', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.hire_date && <span className="text-sm text-red-500">{errors.hire_date}</span>}
                </div>

                {/* รูปภาพ */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image:</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.profile_image && <span className="text-sm text-red-500">{errors.profile_image}</span>}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className={`w-full py-2 px-4 rounded-md text-white ${processing ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'}`}
                    disabled={processing}
                >
                    {processing ? 'Submitting...' : 'Add Employee'}
                </button>
            </form>
        </div>
    );
}
