

import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { studentApi } from '../../api/studentApi';
import { Student } from '../../types/student';
import { toast } from 'react-toastify';
import StudentTable from './StudentTable';
import FilterBar from './FilterBar';
import AddStudentButton from './AddStudentButton';

const StudentReport = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const navigate = useNavigate();

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

  const handleFilter = async (sno?: number, sname?: string) => {
    try {
      const data = await studentApi.filterStudents(sno, sname);
      setStudents(data);
    } catch (error) {
      toast.error('Failed to filter students');
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3c72] to-[#2a5298] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Student Report</h1>
          <AddStudentButton />
        </div>

        <FilterBar onFilter={handleFilter} />

        <div className="bg-white/90 rounded-lg shadow-xl overflow-hidden">
          <StudentTable
            students={students}
            onSort={handleSort}
            onEdit={(sno) => navigate(`/student/edit/${sno}`)}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentReport;