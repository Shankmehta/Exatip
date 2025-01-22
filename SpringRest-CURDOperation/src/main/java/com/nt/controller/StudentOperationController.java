package com.nt.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nt.model.Student;
import com.nt.service.IStudentService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/student") // Changed path to reflect REST API convention
public class StudentOperationController {

    @Autowired
    private IStudentService studentservice;

    // Login Endpoint
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> processLogin(@RequestBody Map<String, String> loginRequest) {
        String username = loginRequest.get("username");
        String password = loginRequest.get("password");

        if (studentservice.validateUser(username, password)) {
            // Return JSON response
            return ResponseEntity.ok(Map.of("message", "Login successful."));
        } else {
            // Return error response
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid username or password."));
        }
    }


    // Welcome Endpoint
    @GetMapping("/welcome")
    public ResponseEntity<String> showHome() {
        return ResponseEntity.ok("Welcome to the Student Management System!");
    }

    // Get All Students
    @GetMapping("/report")
    public ResponseEntity<Iterable<Student>> getStudentReport() {
        Iterable<Student> students = studentservice.getAllStudent();
        return ResponseEntity.ok(students);
    }

    // Add Student
//    @PostMapping("/studentAdd")
//    public ResponseEntity<String> saveStudent(@RequestBody Student student) {
//        String msg = studentservice.registerStudent(student);
//        return ResponseEntity.ok(msg);
//    }

    @PostMapping("/studentAdd")
    public ResponseEntity<String> saveStudent(@RequestBody Student student) {
        student.setAddDate(LocalDateTime.now());
        student.setLastModifiedDate(LocalDateTime.now());
        String msg = studentservice.registerStudent(student);
        return ResponseEntity.ok(msg);
    }
    // Edit Student - Fetch details
    @GetMapping("/edit/{id}")
    public ResponseEntity<Student> getStudentForEdit(@PathVariable("id") int no) {
        Student student = studentservice.getStudentByNo(no);
        return ResponseEntity.ok(student);
    }

//    // Edit Student - Update details
//    @PutMapping("/edit")
//    public ResponseEntity<String> editStudent(@RequestBody Student student) {
//        String msg = studentservice.updateStudent(student);
//        return ResponseEntity.ok(msg);
//    }
    // Edit Student - Update details (with Last Modified Date)
    @PutMapping("/edit")
    public ResponseEntity<String> editStudent(@RequestBody Student student) {
        student.setLastModifiedDate(LocalDateTime.now());
        String msg = studentservice.updateStudent(student);
        return ResponseEntity.ok(msg);
    }

    // Delete Student
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable("id") int no) {
        String msg = studentservice.deleteStudentById(no);
        return ResponseEntity.ok(msg);
    }

    // Filter Students
    @GetMapping("/filter")
    public ResponseEntity<List<Student>> getStudentReport(
            @RequestParam(value = "filterBySno", required = false) Integer filterBySno,
            @RequestParam(value = "filterBySname", required = false) String filterBySname) {
        List<Student> filteredStudents = studentservice.filterStudents(filterBySno, filterBySname);
        return ResponseEntity.ok(filteredStudents);
    }

    // Sort Students
    @GetMapping("/sort")
    public ResponseEntity<List<Student>> showStudentReport(
            @RequestParam(value = "sortBy", required = false) String sortBy,
            @RequestParam(value = "order", required = false, defaultValue = "asc") String order) {
        List<Student> students = studentservice.getSortedStudents(sortBy, order);
        return ResponseEntity.ok(students);
    }
    @PostMapping("/forgot-password")
    public ResponseEntity<Map<String, String>> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        
        if (studentservice.initiatePasswordReset(email)) {
            return ResponseEntity.ok(Map.of("message", "Password reset instructions sent to your email."));
        } else {
            return ResponseEntity.badRequest().body(Map.of("error", "Email not found."));
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Map<String, String>> resetPassword(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String newPassword = request.get("newPassword");
        
        if (studentservice.resetPassword(token, newPassword)) {
            return ResponseEntity.ok(Map.of("message", "Password has been reset successfully."));
        } else {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid or expired reset token."));
        }
    }

    @PostMapping("/sendEmail/{id}")
    public ResponseEntity<String> sendEmail(@PathVariable("id") int studentId) {
        try {
            // Fetch student details by ID
            Student student = studentservice.getStudentByNo(studentId);
            if (student == null) {
                return ResponseEntity.badRequest().body("Student not found.");
            }

            String emailContent = String.format(
            	    "Student Details:\nStudent No: %d\nName: %s\nAddress: %s\nFees: %.2f",
            	    student.getSno(), student.getSname(), student.getSaddress(), (double) student.getFees());



            // Send email
            boolean emailSent = studentservice.sendEmail(student.getEmail(), "Student Details", emailContent);
            if (emailSent) {
                return ResponseEntity.ok("Email sent successfully!");
            } else {
                return ResponseEntity.badRequest().body("Failed to send email. Please check your email configuration.");
            }
        } catch (Exception e) {
            // Log and handle unexpected exceptions
            e.printStackTrace();
            return ResponseEntity.status(500).body("An error occurred while sending the email.");
        }
    }
}

