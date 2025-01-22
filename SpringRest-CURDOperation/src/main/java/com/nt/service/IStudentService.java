package com.nt.service;

import java.util.List;
import com.nt.model.Student;

public interface IStudentService {

    // Get all students
    public Iterable<Student> getAllStudent();

    // Register a new student
    public String registerStudent(Student student);

    // Get student by ID
    public Student getStudentByNo(int no);

    // Update student
    public String updateStudent(Student student);

    // Delete student by ID
    public String deleteStudentById(int no);

    // Filter students by Sno or Sname
    public List<Student> filterStudents(Integer filterBySno, String filterBySname);

    // Get sorted students based on a column and order (ascending/descending)
    public List<Student> getSortedStudents(String sortBy, String order);

    // Validate user login
   
    public boolean validateUser(String username, String password) ;
    boolean initiatePasswordReset(String email);
    boolean resetPassword(String token, String newPassword);
    
    public boolean sendEmail(String recipientEmail, String subject, String messageBody);
}
