

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { Student } from '../../types/student';
// import { studentApi } from '../../api/studentApi';
// import { validateNumber, validateRequired } from '../../utils/validation';
// import Input from '../shared/Input';
// import Button from '../shared/Button';

// const StudentForm = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [student, setStudent] = useState({
//     sname: '',
//     saddress: '',
//     fees: '0'
//   });
//   const [errors, setErrors] = useState({
//     sname: '',
//     saddress: '',
//     fees: ''
//   });

//   useEffect(() => {
//     if (id) {
//       loadStudent();
//     }
//   }, [id]);

//   const loadStudent = async () => {
//     try {
//       const data = await studentApi.getAllStudents();
//       const studentData = data.find((s: Student) => s.sno === parseInt(id!));
//       if (studentData) {
//         setStudent({
//           sname: studentData.sname,
//           saddress: studentData.saddress,
//           fees: studentData.fees.toString()
//         });
//       }
//     } catch (error) {
//       toast.error('Failed to load student data');
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {
//       sname: validateRequired(student.sname) ? '' : 'Name is required',
//       saddress: validateRequired(student.saddress) ? '' : 'Address is required',
//       fees: validateNumber(student.fees) ? '' : 'Invalid fees amount'
//     };
//     setErrors(newErrors);
//     return !Object.values(newErrors).some(error => error);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     try {
//       const studentData = {
//         ...student,
//         fees: parseFloat(student.fees)
//       };

//       if (id) {
//         await studentApi.updateStudent({ ...studentData, sno: parseInt(id) });
//         toast.success('Student updated successfully');
//       } else {
//         await studentApi.addStudent(studentData);
//         toast.success('Student added successfully');
//       }
//       navigate('/students');
//     } catch (error) {
//       toast.error('Failed to save student');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-500 to-teal-400 flex items-center justify-center p-4">
//       <div className="bg-white/85 p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
//           {id ? 'Update Student' : 'Add Student'}
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {id && (
//             <Input
//               label="Student Number"
//               value={id}
//               onChange={() => {}}
//               readonly
//             />
//           )}
//           <Input
//             label="Name"
//             value={student.sname}
//             onChange={(value) => setStudent({ ...student, sname: value })}
//             error={errors.sname}
//             required
//           />
//           <Input
//             label="Address"
//             value={student.saddress}
//             onChange={(value) => setStudent({ ...student, saddress: value })}
//             error={errors.saddress}
//             required
//           />
//           <Input
//             type="number"
//             label="Fees"
//             value={student.fees}
//             onChange={(value) => setStudent({ ...student, fees: value })}
//             error={errors.fees}
//             required
//             validation={validateNumber}
//           />
//           <div className="flex gap-4 mt-6">
//             <Button type="submit" variant="primary" fullWidth>
//               {id ? 'Update' : 'Add'} Student
//             </Button>
//             <Button
//               type="button"
//               variant="secondary"
//               fullWidth
//               onClick={() => navigate('/students')}
//             >
//               Cancel
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default StudentForm;



// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { Student } from '../../types/student';
// import { studentApi } from '../../api/studentApi';
// import { validateNumber, validateRequired, validateEmail } from '../../utils/validation';
// import Input from '../shared/Input';
// import Button from '../shared/Button';

// const StudentForm = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [student, setStudent] = useState({
//     sname: '',
//     saddress: '',
//     fees: '0',
//     email: ''
//   });
//   const [errors, setErrors] = useState({
//     sname: '',
//     saddress: '',
//     fees: '',
//     email: ''
//   });

//   useEffect(() => {
//     if (id) {
//       loadStudent();
//     }
//   }, [id]);

//   const loadStudent = async () => {
//     try {
//       const data = await studentApi.getAllStudents();
//       const studentData = data.find((s: Student) => s.sno === parseInt(id!));
//       if (studentData) {
//         setStudent({
//           sname: studentData.sname,
//           saddress: studentData.saddress,
//           fees: studentData.fees.toString(),
//           email: studentData.email || ''
//         });
//       }
//     } catch (error) {
//       toast.error('Failed to load student data');
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {
//       sname: validateRequired(student.sname) ? '' : 'Name is required',
//       saddress: validateRequired(student.saddress) ? '' : 'Address is required',
//       fees: validateNumber(student.fees) ? '' : 'Invalid fees amount',
//       email: student.email ? (validateEmail(student.email) ? '' : 'Invalid email') : ''
//     };
//     setErrors(newErrors);
//     return !Object.values(newErrors).some(error => error);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validateForm()) return;
  
//     try {
//       const currentDate = new Date().toISOString();
//       const studentData = {
//         ...student,
//         fees: parseFloat(student.fees),
//         lastModifiedDate: currentDate
//       };
  
//       if (id) {
//         const existingStudent = await studentApi.getStudentById(parseInt(id));
//         await studentApi.updateStudent({
//           ...studentData,
//           sno: parseInt(id),
//           addDate: existingStudent.addDate || currentDate // Fallback if addDate is missing
//         });
//         toast.success('Student updated successfully');
//       } else {
//         await studentApi.addStudent({
//           ...studentData,
//           addDate: currentDate,
//           lastModifiedDate: currentDate
//         });
//         toast.success('Student added successfully');
//       }
//       navigate('/students');
//     } catch (error) {
//       toast.error('Failed to save student');
//     }
//   };
  
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-500 to-teal-400 flex items-center justify-center p-4">
//       <div className="bg-white/85 p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
//           {id ? 'Update Student' : 'Add Student'}
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {id && (
//             <Input
//               label="Student Number"
//               value={id}
//               onChange={() => {}}
//               readonly
//             />
//           )}
//           <Input
//             label="Name"
//             value={student.sname}
//             onChange={(value) => setStudent({ ...student, sname: value })}
//             error={errors.sname}
//             required
//           />
//           <Input
//             label="Address"
//             value={student.saddress}
//             onChange={(value) => setStudent({ ...student, saddress: value })}
//             error={errors.saddress}
//             required
//           />
//           <Input
//             type="number"
//             label="Fees"
//             value={student.fees}
//             onChange={(value) => setStudent({ ...student, fees: value })}
//             error={errors.fees}
//             required
//             validation={validateNumber}
//           />
//           <Input
//             type="email"
//             label="Email"
//             value={student.email}
//             onChange={(value) => setStudent({ ...student, email: value })}
//             error={errors.email}
//             validation={validateEmail}
//           />
//           <div className="flex gap-4 mt-6">
//             <Button type="submit" variant="primary" fullWidth>
//               {id ? 'Update' : 'Add'} Student
//             </Button>
//             <Button
//               type="button"
//               variant="secondary"
//               fullWidth
//               onClick={() => navigate('/students')}
//             >
//               Cancel
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default StudentForm;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { studentApi } from '../../api/studentApi';
import { validateNumber, validateRequired, validateEmail } from '../../utils/validation';
import Input from '../shared/Input';
import Button from '../shared/Button';

const StudentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    sname: '',
    saddress: '',
    fees: '0',
    email: '',
    addDate: '',
    lastModifiedDate: ''
  });
  const [errors, setErrors] = useState({
    sname: '',
    saddress: '',
    fees: '',
    email: ''
  });

  useEffect(() => {
    if (id) {
      loadStudent();
    }
  }, [id]);

  const loadStudent = async () => {
    try {
      const studentData = await studentApi.getStudentById(parseInt(id!));
      if (studentData) {
        setStudent({
          sname: studentData.sname,
          saddress: studentData.saddress,
          fees: studentData.fees.toString(),
          email: studentData.email || '',
          addDate: studentData.addDate || '',
          lastModifiedDate: studentData.lastModifiedDate || ''
        });
      }
    } catch (error) {
      toast.error('Failed to load student data');
    }
  };

  const validateForm = () => {
    const newErrors = {
      sname: validateRequired(student.sname) ? '' : 'Name is required',
      saddress: validateRequired(student.saddress) ? '' : 'Address is required',
      fees: validateNumber(student.fees) ? '' : 'Invalid fees amount',
      email: student.email ? (validateEmail(student.email) ? '' : 'Invalid email') : ''
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const currentDate = new Date().toISOString();
      const studentData = {
        ...student,
        fees: parseFloat(student.fees),
        lastModifiedDate: currentDate
      };

      if (id) {
        await studentApi.updateStudent({
          ...studentData,
          sno: parseInt(id),
          addDate: student.addDate || currentDate // Keep original addDate if it exists
        });
        toast.success('Student updated successfully');
      } else {
        await studentApi.addStudent({
          ...studentData,
          addDate: currentDate,
          lastModifiedDate: currentDate
        });
        toast.success('Student added successfully');
      }
      navigate('/students');
    } catch (error) {
      toast.error('Failed to save student');
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-teal-400 flex items-center justify-center p-4">
      <div className="bg-white/85 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {id ? 'Update Student' : 'Add Student'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {id && (
            <>
              <Input
                label="Student Number"
                value={id}
                onChange={() => {}}
                readonly
              />
              {student.addDate && (
                <div className="text-sm text-gray-600">
                  <p>Added: {formatDate(student.addDate)}</p>
                  {student.lastModifiedDate && (
                    <p>Last Modified: {formatDate(student.lastModifiedDate)}</p>
                  )}
                </div>
              )}
            </>
          )}
          <Input
            label="Name"
            value={student.sname}
            onChange={(value) => setStudent({ ...student, sname: value })}
            error={errors.sname}
            required
          />
          <Input
            label="Address"
            value={student.saddress}
            onChange={(value) => setStudent({ ...student, saddress: value })}
            error={errors.saddress}
            required
          />
          <Input
            type="number"
            label="Fees"
            value={student.fees}
            onChange={(value) => setStudent({ ...student, fees: value })}
            error={errors.fees}
            required
            validation={validateNumber}
          />
          {/* <Input
            type="email"
            label="Email"
            value={student.email}
            onChange={(value) => setStudent({ ...student, email: value })}
            error={errors.email}
            validation={validateEmail}
          /> */}

<Input
  type="email"
  label="Email"
  value={student.email}
  onChange={(value: string) => setStudent({ ...student, email: value })}
  error={errors.email}
  required
/>
          <div className="flex gap-4 mt-6">
            <Button type="submit" variant="primary" fullWidth>
              {id ? 'Update' : 'Add'} Student
            </Button>
            <Button
              type="button"
              variant="secondary"
              fullWidth
              onClick={() => navigate('/students')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;


