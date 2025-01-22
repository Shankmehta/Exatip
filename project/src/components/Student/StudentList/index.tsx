import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Student } from '../../../types/student';
import { studentApi } from '../../../api/studentApi';
import FilterBar from './FilterBar';
import StudentTable from './StudentTable';
import Button from '../../shared/Button';

const StudentList = () => {
  const navigate = useNavigate();
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

  const handleFilterChange = (field: 'sno' | 'name', value: string) => {
    if (field === 'sno') setFilterSno(value);
    else setFilterName(value);
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
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Student Management</h1>
        <Button onClick={() => navigate('/add')}>Add New Student</Button>
      </div>

      <FilterBar
        filterSno={filterSno}
        filterName={filterName}
        onFilterChange={handleFilterChange}
        onFilter={handleFilter}
      />

      <StudentTable
        students={students}
        onSort={handleSort}
        onEdit={(sno) => navigate(`/edit/${sno}`)}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default StudentList;