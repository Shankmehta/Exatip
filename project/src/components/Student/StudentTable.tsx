




// import React from 'react';
// import { ArrowUp, ArrowDown, Edit, Trash2, Send } from 'lucide-react';
// import { studentApi } from '../../api/studentApi';
// import { toast } from 'react-toastify';
// import { Student } from '../../types/student';

// interface StudentTableProps {
//   students: Student[];
//   onSort: (field: string, order: 'asc' | 'desc') => void;
//   onEdit: (sno: number) => void;
//   onDelete: (sno: number) => void;
// }

// const StudentTable: React.FC<StudentTableProps> = ({
//   students,
//   onSort,
//   onEdit,
//   onDelete,
// }) => {
//   const SortButtons = ({ field }: { field: string }) => (
//     <div className="flex flex-col gap-1 items-center">
//       <button onClick={() => onSort(field, 'asc')} className="hover:text-blue-600">
//         <ArrowUp size={16} />
//       </button>
//       <button onClick={() => onSort(field, 'desc')} className="hover:text-blue-600">
//         <ArrowDown size={16} />
//       </button>
//     </div>
//   );

//   const handleSendEmail = async (studentId: number) => {
//     try {
//       await studentApi.sendEmail(studentId);
//       toast.success('Email sent successfully!');
//     } catch (error) {
//       toast.error('Failed to send email. Please try again.');
//     }
//   };

//   const formatDate = (dateString: string | null | undefined) => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) return 'N/A';
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//     });
//   };

//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full table-auto">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               <div className="flex items-center gap-2">
//                 Student No
//                 <SortButtons field="sno" />
//               </div>
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               <div className="flex items-center gap-2">
//                 Name
//                 <SortButtons field="sname" />
//               </div>
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               <div className="flex items-center gap-2">
//                 Address
//                 <SortButtons field="saddress" />
//               </div>
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               <div className="flex items-center gap-2">
//                 Fees
//                 <SortButtons field="fees" />
//               </div>
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-xs truncate">
//               Email
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Add Date
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Last Modified
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {students.map((student) => (
//             <tr key={student.sno} className="hover:bg-gray-50">
//               <td className="px-6 py-4 whitespace-nowrap">{student.sno}</td>
//               <td className="px-6 py-4 whitespace-nowrap">{student.sname}</td>
//               <td className="px-6 py-4 whitespace-nowrap">{student.saddress}</td>
//               <td className="px-6 py-4 whitespace-nowrap">{student.fees}</td>
//               <td className="px-6 py-4 whitespace-nowrap max-w-xs truncate">
//                 {student.email || 'N/A'}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 {formatDate(student.addDate)}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 {formatDate(student.lastModifiedDate)}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap w-48">
//                 <div className="flex gap-2 items-center justify-start">
//                   <button
//                     onClick={() => onEdit(student.sno)}
//                     className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
//                     title="Edit"
//                   >
//                     <Edit size={20} />
//                     <span className="sr-only">Edit</span>
//                   </button>
//                   <button
//                     onClick={() => onDelete(student.sno)}
//                     className="text-red-600 hover:text-red-800 flex items-center gap-1"
//                     title="Delete"
//                   >
//                     <Trash2 size={20} />
//                     <span className="sr-only">Delete</span>
//                   </button>
//                   {student.email && (
//                     <button
//                       onClick={() => handleSendEmail(student.sno)}
//                       className="text-green-600 hover:text-green-800 flex items-center gap-1"
//                       title="Send Email"
//                     >
//                       <Send size={20} />
//                       <span className="sr-only">Send Email</span>
//                     </button>
//                   )}
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default StudentTable;

import React, { useState } from 'react';
import { ArrowUp, ArrowDown, Edit, Trash2, Send } from 'lucide-react';
import { studentApi } from '../../api/studentApi';
import { toast } from 'react-toastify';
import { Student } from '../../types/student';

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
  const [sortField, setSortField] = useState<string>('sno');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Sort students based on current sort field and order
  const sortedStudents = [...students].sort((a, b) => {
    const aValue = a[sortField as keyof Student];
    const bValue = b[sortField as keyof Student];

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return 0;
  });

  const handleSort = (field: string, order: 'asc' | 'desc') => {
    setSortField(field);
    setSortOrder(order);
    onSort(field, order);
  };

  const SortButtons = ({ field }: { field: string }) => (
    <div className="flex flex-col gap-1 items-center">
      <button 
        onClick={() => handleSort(field, 'asc')} 
        className={`hover:text-blue-600 ${sortField === field && sortOrder === 'asc' ? 'text-blue-600' : ''}`}
      >
        <ArrowUp size={16} />
      </button>
      <button 
        onClick={() => handleSort(field, 'desc')} 
        className={`hover:text-blue-600 ${sortField === field && sortOrder === 'desc' ? 'text-blue-600' : ''}`}
      >
        <ArrowDown size={16} />
      </button>
    </div>
  );

  const handleSendEmail = async (studentId: number) => {
    try {
      await studentApi.sendEmail(studentId);
      toast.success('Email sent successfully!');
    } catch (error) {
      toast.error('Failed to send email. Please try again.');
    }
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'N/A';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center gap-2">
                Student No
                <SortButtons field="sno" />
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center gap-2">
                Name
                <SortButtons field="sname" />
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center gap-2">
                Address
                <SortButtons field="saddress" />
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center gap-2">
                Fees
                <SortButtons field="fees" />
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-xs truncate">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Add Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Modified
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedStudents.map((student) => (
            <tr key={student.sno} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">{student.sno}</td>
              <td className="px-6 py-4 whitespace-nowrap">{student.sname}</td>
              <td className="px-6 py-4 whitespace-nowrap">{student.saddress}</td>
              <td className="px-6 py-4 whitespace-nowrap">{student.fees}</td>
              <td className="px-6 py-4 whitespace-nowrap max-w-xs truncate">
                {student.email || 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {formatDate(student.addDate)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {formatDate(student.lastModifiedDate)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap w-48">
                <div className="flex gap-2 items-center justify-start">
                  <button
                    onClick={() => onEdit(student.sno)}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    title="Edit"
                  >
                    <Edit size={20} />
                    <span className="sr-only">Edit</span>
                  </button>
                  <button
                    onClick={() => onDelete(student.sno)}
                    className="text-red-600 hover:text-red-800 flex items-center gap-1"
                    title="Delete"
                  >
                    <Trash2 size={20} />
                    <span className="sr-only">Delete</span>
                  </button>
                  {student.email && (
                    <button
                      onClick={() => handleSendEmail(student.sno)}
                      className="text-green-600 hover:text-green-800 flex items-center gap-1"
                      title="Send Email"
                    >
                      <Send size={20} />
                      <span className="sr-only">Send Email</span>
                    </button>
                  )}
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









