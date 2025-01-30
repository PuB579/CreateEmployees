import { router } from '@inertiajs/react';
import { useState } from 'react';
import FlashMessage from '@/Components/FlashMessage'; // นำเข้าคอมโพเนนต์ FlashMessage
import { usePage } from '@inertiajs/react';

export default function Index({ employees, query }) {
    const [search, setSearch] = useState(query || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/employee', { search }); // รีเฟรชหน้าเมื่อทำการค้นหา
    };

    const calculateAge = (birthDate) => {
        const birth = new Date(birthDate);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const monthDifference = today.getMonth() - birth.getMonth();

        if (
            monthDifference < 0 ||
            (monthDifference === 0 && today.getDate() < birth.getDate())
        ) {
            age--;
        }
        return age;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const { flash } = usePage().props; // ดึงข้อมูล flash จาก Inertia page

    return (
        <div className="container mx-auto p-4">
            {/* แสดงข้อความ flash ถ้ามี */}
            <FlashMessage flash={flash} />

            <h1 className="text-2xl font-bold mb-4">Employee List</h1>

            {/* ฟอร์มค้นหาพนักงาน */}
            <form onSubmit={handleSearch} className="mb-4">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border p-2 mr-2"
                    placeholder="Search employees..."
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Search
                </button>
            </form>

            {/* แสดงรายชื่อพนักงาน */}
            {employees.data.length > 0 ? (
                <>
                    <table className="min-w-full bg-white border">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border">Profile</th>
                                <th className="py-2 px-4 border">ID</th>
                                <th className="py-2 px-4 border">First Name</th>
                                <th className="py-2 px-4 border">Last Name</th>
                                <th className="py-2 px-4 border">Birthdate</th>
                                <th className="py-2 px-4 border">Age</th>
                            </tr>
                        </thead>
                        <tbody>
                        {employees.data.map((employee, index) => (
                                <tr key={index} className="text-center">
                                    <td className="py-2 px-4 border">
                                        {employee.profile_image ? (
                                            <img
                                                src={`/storage/${employee.profile_image}`}
                                                alt={`${employee.first_name}'s profile`}
                                                className="w-16 h-16 object-cover rounded-full mx-auto"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = '/default-avatar.png'; // Add a default image
                                                }}
                                            />
                                        ) : (
                                            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto flex items-center justify-center">
                                                No Image
                                            </div>
                                        )}
                                    </td>
                                    <td className="py-2 px-4 border">{employee.emp_no}</td>
                                    <td className="py-2 px-4 border">{employee.first_name}</td>
                                    <td className="py-2 px-4 border">{employee.last_name}</td>
                                    <td className="py-2 px-4 border">{formatDate(employee.birth_date)}</td>
                                    <td className="py-2 px-4 border">{calculateAge(employee.birth_date)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="flex justify-between mt-4">
                        {employees.prev_page_url && (
                            <button
                                onClick={() => router.get(employees.prev_page_url)}
                                className="bg-blue-500 text-white p-2 rounded"
                            >
                                Previous
                            </button>
                        )}
                        {employees.next_page_url && (
                            <button
                                onClick={() => router.get(employees.next_page_url)}
                                className="bg-blue-500 text-white p-2 rounded"
                            >
                                Next
                            </button>
                        )}
                    </div>
                </>
            ) : (
                <div className="py-4 text-center text-gray-500">
                    No employees found.
                </div>
            )}
        </div>
    );
}
