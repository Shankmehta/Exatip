


// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Student } from '../types/student';
// import { studentApi } from '../api/studentApi';
// import { toast } from 'react-toastify';

// const StudentForm = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [student, setStudent] = useState<Student>({
//     sno: 0,
//     sname: '',
//     saddress: '',
//     fees: 0,
//   });

//   useEffect(() => {
//     if (id) {
//       loadStudent();
//     }
//   }, [id]);

//   // Load student details for editing
//   const loadStudent = async () => {
//     try {
//       const studentData = await studentApi.getStudentById(parseInt(id!));
//       setStudent(studentData);
//     } catch (error) {
//       toast.error('Failed to load student details');
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
  
//     try {
//       if (!student.sname || !student.saddress || student.fees <= 0) {
//         toast.error("Please fill in all the required fields properly.");
//         return;
//       }
  
//       if (id) {
//         // Edit functionality
//         await studentApi.updateStudent(student);
//         toast.success('Student updated successfully');
//       } else {
//         // Add functionality
//         const newStudent = {
//           sname: student.sname.trim(),
//           saddress: student.saddress.trim(),
//           fees: student.fees,
//         };
//         await studentApi.addStudent(newStudent);
//         toast.success('Student added successfully');
//       }
//       navigate('/student/report');
//     } catch (error: any) {
//       toast.error('Failed to save student. ' + (error.response?.data?.message || ''));
//     }
//   };
  

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="bg-white p-8 rounded-lg shadow-md w-96">
//         <h2 className="text-2xl font-bold mb-6 text-center">
//           {id ? 'Edit Student' : 'Add Student'}
//         </h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Name
//             </label>
//             <input
//               type="text"
//               value={student.sname}
//               onChange={(e) => setStudent({ ...student, sname: e.target.value })}
//               className="w-full p-2 border rounded-md"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Address
//             </label>
//             <input
//               type="text"
//               value={student.saddress}
//               onChange={(e) => setStudent({ ...student, saddress: e.target.value })}
//               className="w-full p-2 border rounded-md"
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Fees
//             </label>
//             <input
//               type="number"
//               value={student.fees}
//               onChange={(e) => setStudent({ ...student, fees: parseFloat(e.target.value) })}
//               className="w-full p-2 border rounded-md"
//               required
//             />
//           </div>
//           <div className="flex gap-4">
//             <button
//               type="submit"
//               className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
//             >
//               {id ? 'Update' : 'Add'} Student
//             </button>
//             <button
//               type="button"
//               onClick={() => navigate('/student/report')}
//               className="w-full bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default StudentForm;

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Student } from '../types/student';
// import { studentApi } from '../api/studentApi';
// import { toast } from 'react-toastify';

// const StudentForm = () => {
//   const { id } = useParams<{ id?: string }>();
//   const navigate = useNavigate();
//   const [student, setStudent] = useState<Student>({
//     sno: 0,
//     sname: '',
//     saddress: '',
//     fees: 0,
//     addDate: '',
//     lastModifiedDate: '',
//   });

//   useEffect(() => {
//     if (id && !isNaN(Number(id))) {
//       loadStudent();
//     }
//   }, [id]);

//   const loadStudent = async () => {
//     try {
//       const studentData = await studentApi.getStudentById(Number(id));
//       setStudent(studentData);
//     } catch (error) {
//       toast.error('Failed to load student details');
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!student.sname.trim() || !student.saddress.trim() || student.fees <= 0) {
//       toast.error('Please fill in all the required fields properly.');
//       return;
//     }

//     try {
//       if (id) {
//         await studentApi.updateStudent(student);
//         toast.success('Student updated successfully');
//       } else {
//         const newStudent: Student = {
//           ...student,
//           sno: 0,
//           addDate: new Date().toISOString(),
//           lastModifiedDate: new Date().toISOString(),
//         };
//         await studentApi.addStudent(newStudent);
//         toast.success('Student added successfully');
//       }
//       navigate('/student/report');
//     } catch (error: any) {
//       toast.error('Failed to save student. ' + (error.response?.data?.message || ''));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="bg-white p-8 rounded-lg shadow-md w-96">
//         <h2 className="text-2xl font-bold mb-6 text-center">
//           {id ? 'Edit Student' : 'Add Student'}
//         </h2>
//         <form onSubmit={handleSubmit}>
//           {/* Form fields here */}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default StudentForm;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Student } from '../types/student';
import { studentApi } from '../api/studentApi';
import { toast } from 'react-toastify';

const StudentForm = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [student, setStudent] = useState<Student>({
    sno: 0,
    sname: '',
    saddress: '',
    fees: 0,
    email: '', // Added email field
    addDate: '',
    lastModifiedDate: '',
  });

  useEffect(() => {
    if (id && !isNaN(Number(id))) {
      loadStudent();
    }
  }, [id]);

  const loadStudent = async () => {
    try {
      const studentData = await studentApi.getStudentById(Number(id));
      setStudent(studentData);
    } catch (error) {
      toast.error('Failed to load student details');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!student.sname.trim() || !student.saddress.trim() || student.fees <= 0 || !student.email.trim()) {
      toast.error('Please fill in all the required fields properly.');
      return;
    }

    try {
      if (id) {
        await studentApi.updateStudent(student);
        toast.success('Student updated successfully');
      } else {
        const newStudent: Student = {
          ...student,
          sno: 0,
          addDate: new Date().toISOString(),
          lastModifiedDate: new Date().toISOString(),
        };
        await studentApi.addStudent(newStudent);
        toast.success('Student added successfully');
      }
      navigate('/student/report');
    } catch (error: any) {
      toast.error('Failed to save student. ' + (error.response?.data?.message || ''));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {id ? 'Edit Student' : 'Add Student'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="sname" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="sname"
              name="sname"
              value={student.sname}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="saddress" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <textarea
              id="saddress"
              name="saddress"
              value={student.saddress}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fees" className="block text-sm font-medium text-gray-700">
              Fees
            </label>
            <input
              type="number"
              id="fees"
              name="fees"
              value={student.fees}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={student.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;

