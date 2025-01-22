import api from './axios';
import { Student, LoginCredentials } from '../types/student';

export const studentApi = {
  login: async (credentials: LoginCredentials) => {
    const response = await api.post('/login', credentials);
    return response.data;
  },

  // getAllStudents: async () => {
  //   const response = await api.get<StudentResponse>('/report');
  //   return response.data.data || [];
  // },
  getAllStudents: async () => {
    const response = await api.get<Student[]>('/report');
    return response.data; // Assuming this returns a list of students directly
  },

  // addStudent: async (student: Omit<Student, 'sno'>) => {
  //   const response = await api.post('/studentAdd', student);
  //   return response.data;
  // },

  // updateStudent: async (student: Student) => {
  //   const response = await api.post(`/edit`, student);
  //   return response.data;
  // },

  addStudent: async (student: Omit<Student, 'sno'>) => {
    const response = await api.post('/studentAdd', student, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  },
  
  
    updateStudent: async (student: Student) => {
      const response = await api.put('/edit', student); // Use PUT for update
      return response.data;
    },
    getStudentById: async (id: number) => {
      const response = await api.get(`/edit/${id}`); // Fetch student details for edit
      return response.data;
    },

    deleteStudent: async (sno: number) => {
      const response = await api.delete(`/delete/${sno}`);
      return response.data;
    },

  filterStudents: async (sno?: number, sname?: string) => {
    const params = new URLSearchParams();
    if (sno) params.append('filterBySno', sno.toString());
    if (sname) params.append('filterBySname', sname);
    const response = await api.get(`/filter?${params.toString()}`);
    return response.data;
  },

  sortStudents: async (sortBy: string, order: 'asc' | 'desc') => {
    const response = await api.get(`/sort?sortBy=${sortBy}&order=${order}`);
    return response.data;
  },
  sendEmail: async (studentId: number) => {
    try {
      const response = await api.post(`/sendEmail/${studentId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
}; 

