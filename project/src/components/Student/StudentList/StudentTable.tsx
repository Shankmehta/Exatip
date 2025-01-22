import React from 'react';
import { Student } from '../../../types/student';
import { Edit, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

interface StudentTableProps {
  students: Student[];
  onSort: (field: string, order: 'asc' | 'desc') => void;
  onEdit: (sno: number) => void;
  onDelete: (sno: number) => void;
}

const StudentTable: React.FC<StudentTableProps> = ({
  students,
  onSort,
  onEdit,
  onDelete,
}) => {
  const SortButtons = ({ field }: { field: string }) => (
    <div className="flex gap-2">
      <button onClick={() => onSort(field, 'asc')}><ArrowUp size={16} /></button>
      <button onClick={() => onSort(field, 'desc')}><ArrowDown size={16} /></button>
    </div>
  );

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Student No
              <SortButtons field="sno" />
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
              <SortButtons field="sname" />
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Address
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fees
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {students.map((student) => (
            <tr key={student.sno} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">{student.sno}</td>
              <td className="px-6 py-4 whitespace-nowrap">{student.sname}</td>
              <td className="px-6 py-4 whitespace-nowrap">{student.saddress}</td>
              <td className="px-6 py-4 whitespace-nowrap">{student.fees}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(student.sno)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => onDelete(student.sno)}
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
  );
};

export default StudentTable;