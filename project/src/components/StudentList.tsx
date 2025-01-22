import  { useState, useEffect } from 'react';
import { Student } from '../types/student';
import { studentApi } from '../api/studentApi';
import { toast } from 'react-toastify';
import { Edit, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

const StudentList = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filterSno, setFilterSno] = useState('');
  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const data = await studentApi.getAllStudents();
      setStudents(data);
    } catch (error) {
      toast.error('Failed to load students');
    }
  };

  const handleDelete = async (sno: number) => {
    if (window.confirm('Do you want to delete this student?')) {
      try {
        await studentApi.deleteStudent(sno);
        toast.success('Student deleted successfully');
        loadStudents();
      } catch (error) {
        toast.error('Failed to delete student');
      }
    }
  };

  const handleSort = async (field: string, order: 'asc' | 'desc') => {
    try {
      const data = await studentApi.sortStudents(field, order);
      setStudents(data);
    } catch (error) {
      toast.error('Failed to sort students');
    }
  };

  const handleFilter = async () => {
    try {
      const data = await studentApi.filterStudents(
        filterSno ? parseInt(filterSno) : undefined,
        filterName || undefined
      );
      setStudents(data);
    } catch (error) {
      toast.error('Failed to filter students');
    }
  };

  return (
    <div className="p-8">
      <div className="mb-6 flex gap-4">
        <input
          type="number"
          placeholder="Filter by Student No"
          value={filterSno}
          onChange={(e) => setFilterSno(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Filter by Name"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          onClick={handleFilter}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Filter
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">
                Student No
                <div className="flex gap-2">
                  <button onClick={() => handleSort('sno', 'asc')}><ArrowUp size={16} /></button>
                  <button onClick={() => handleSort('sno', 'desc')}><ArrowDown size={16} /></button>
                </div>
              </th>
              <th className="px-6 py-3 text-left">
                Name
                <div className="flex gap-2">
                  <button onClick={() => handleSort('sname', 'asc')}><ArrowUp size={16} /></button>
                  <button onClick={() => handleSort('sname', 'desc')}><ArrowDown size={16} /></button>
                </div>
              </th>
              <th className="px-6 py-3 text-left">
                Address
                <div className="flex gap-2">
                  <button onClick={() => handleSort('saddress', 'asc')}><ArrowUp size={16} /></button>
                  <button onClick={() => handleSort('saddress', 'desc')}><ArrowDown size={16} /></button>
                </div>
                </th>
              <th className="px-6 py-3 text-left">
                Fees
                <div className="flex gap-2">
                  <button onClick={() => handleSort('fees', 'asc')}><ArrowUp size={16} /></button>
                  <button onClick={() => handleSort('fees', 'desc')}><ArrowDown size={16} /></button>
                </div>
                </th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.sno} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{student.sno}</td>
                <td className="px-6 py-4">{student.sname}</td>
                <td className="px-6 py-4">{student.saddress}</td>
                <td className="px-6 py-4">{student.fees}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => window.location.href = `/edit/${student.sno}`}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(student.sno)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;


