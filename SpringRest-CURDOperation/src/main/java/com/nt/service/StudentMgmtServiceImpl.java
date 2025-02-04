//package com.nt.service;
//
//
//import java.time.LocalDateTime;
//import java.util.Comparator;
//import java.util.List;
//import java.util.Map;
//import java.util.Optional;
//import java.util.UUID;
//import java.util.stream.Collectors;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.mail.SimpleMailMessage;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.stereotype.Service;
//
//import com.nt.model.Student;
//import com.nt.repo.IStudentRepository;
//
//@Service("studentService")
//public class StudentMgmtServiceImpl implements IStudentService {
//
//    @Autowired
//    private IStudentRepository studentrepo;
//
//    @Autowired
//    private JavaMailSender mailSender;
//
//    // Get all students
//    @Override
//    public Iterable<Student> getAllStudent() {
//        return studentrepo.findAll();
//    }
//
//    // Register a new student
//    @Override
//    public String registerStudent(Student student) {
//        Student savedStudent = studentrepo.save(student);
//        return "Student saved with ID: " + savedStudent.getSno();
//    }
//
//    // Get student by ID
//    @Override
//    public Student getStudentByNo(int no) {
//        return studentrepo.findById(no)
//            .orElseThrow(() -> new IllegalArgumentException("Student with ID " + no + " not found"));
//    }
//
//    // Update student
//    @Override
//    public String updateStudent(Student student) {
//        if (!studentrepo.existsById(student.getSno())) {
//            throw new IllegalArgumentException("Student with ID " + student.getSno() + " not found");
//        }
//        Student updatedStudent = studentrepo.save(student);
//        return "Student updated with ID: " + updatedStudent.getSno();
//    }
//
//    // Delete student by ID
//    @Override
//    public String deleteStudentById(int no) {
//        if (!studentrepo.existsById(no)) {
//            throw new IllegalArgumentException("Student with ID " + no + " not found");
//        }
//        studentrepo.deleteById(no);
//        return "Student with ID " + no + " has been deleted";
//    }
//
//
//    
//    private static final String ADMIN_USERNAME = "ADMIN";
//    @Override
//    public boolean validateUser(String username, String password) {
//        if (ADMIN_USERNAME.equals(username)) {
//            Optional<Student> adminUser = studentrepo.findBySname(ADMIN_USERNAME);
//            return adminUser.isPresent() && adminUser.get().getPassword().equals(password);
//        }
//        return false;
//    }
//
//    // Filter students
//    @Override
//    public List<Student> filterStudents(Integer filterBySno, String filterBySname) {
//        if (filterBySno == null && (filterBySname == null || filterBySname.isEmpty())) {
//            return studentrepo.findAll(); // Return all if no filters
//        }
//        if (filterBySno != null && filterBySname != null && !filterBySname.isEmpty()) {
//            return studentrepo.findBySnoAndSnameContaining(filterBySno, filterBySname);
//        }
//        if (filterBySno != null) {
//            return studentrepo.findBySno(filterBySno);
//        }
//        if (filterBySname != null && !filterBySname.isEmpty()) {
//            return studentrepo.findBySnameContaining(filterBySname);
//        }
//        return studentrepo.findAll(); // Default return all
//    }
//
//    // Sort students
//    @Override
//    public List<Student> getSortedStudents(String sortBy, String order) {
//        List<Student> students = (List<Student>) studentrepo.findAll();
//        if (sortBy != null) {
//            Comparator<Student> comparator = switch (sortBy) {
//                case "sno" -> Comparator.comparing(Student::getSno);
//                case "sname" -> Comparator.comparing(student -> student.getSname().toLowerCase());
//                case "saddress" -> Comparator.comparing(student -> student.getSaddress().toLowerCase());
//                case "fees" -> Comparator.comparing(Student::getFees);
//                default -> throw new IllegalArgumentException("Invalid sortBy parameter");
//            };
//
//            if ("desc".equalsIgnoreCase(order)) {
//                comparator = comparator.reversed();
//            }
//            students = students.stream().sorted(comparator).collect(Collectors.toList());
//        }
//        return students;
//    }
//
//    @Override
//    public boolean resetPassword(String token, String newPassword) {
//        Optional<Student> studentOpt = studentrepo.findByResetToken(token);
//        if (studentOpt.isPresent()) {
//            Student student = studentOpt.get();
//            if (student.getResetTokenExpiry().isAfter(LocalDateTime.now())) {
//                if (ADMIN_USERNAME.equals(student.getSname())) {
//                    student.setPassword(newPassword); // Update password for ADMIN
//                } else {
//                    student.setPassword(newPassword); // Update password for regular users
//                }
//                student.setResetToken(null);
//                student.setResetTokenExpiry(null);
//                studentrepo.save(student);
//                return true;
//            }
//        }
//        return false;
//    }
//
//    // Initiate password reset
//    @Override
//    public boolean initiatePasswordReset(String email) {
//        Optional<Student> studentOpt = studentrepo.findByEmail(email);
//        if (studentOpt.isPresent()) {
//            Student student = studentOpt.get();
//            String token = generateResetToken();
//            student.setResetToken(token);
//            student.setResetTokenExpiry(LocalDateTime.now().plusHours(24));
//            studentrepo.save(student);
//
//            // Send reset email
//            sendResetEmail(student.getEmail(), token);
//            return true;
//        }
//        return false;
//    }
//
//    private String generateResetToken() {
//        return UUID.randomUUID().toString();
//    }
//
//    private void sendResetEmail(String email, String token) {
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setTo(email);
//        message.setSubject("Password Reset Request");
//        message.setText("To reset your password, click the following link: "
//                + "http://localhost:5173/reset-password?token=" + token);
//        mailSender.send(message);
//    }
//
//}
//


package com.nt.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.nt.model.Student;
import com.nt.repo.IStudentRepository;

@Service("studentService")
public class StudentMgmtServiceImpl implements IStudentService {

    @Autowired
    private IStudentRepository studentrepo;

    @Autowired
    private JavaMailSender mailSender;

    private static final String ADMIN_USERNAME = "ADMIN";

    // Get all students
    @Override
    public Iterable<Student> getAllStudent() {
        return studentrepo.findAll();
    }

    // Register a new student (addDate auto-populated)
    @Override
    public String registerStudent(Student student) {
        student.setAddDate(LocalDateTime.now());
        student.setLastModifiedDate(LocalDateTime.now());
        Student savedStudent = studentrepo.save(student);
        return "Student saved with ID: " + savedStudent.getSno();
    }

    // Get student by ID
    @Override
    public Student getStudentByNo(int no) {
        return studentrepo.findById(no)
            .orElseThrow(() -> new IllegalArgumentException("Student with ID " + no + " not found"));
    }

    // Update student (lastModified auto-updated)
    @Override
    public String updateStudent(Student student) {
        if (!studentrepo.existsById(student.getSno())) {
            throw new IllegalArgumentException("Student with ID " + student.getSno() + " not found");
        }
        student.setLastModifiedDate(LocalDateTime.now());
        Student updatedStudent = studentrepo.save(student);
        return "Student updated with ID: " + updatedStudent.getSno();
    }

    // Delete student by ID
    @Override
    public String deleteStudentById(int no) {
        if (!studentrepo.existsById(no)) {
            throw new IllegalArgumentException("Student with ID " + no + " not found");
        }
        studentrepo.deleteById(no);
        return "Student with ID " + no + " has been deleted";
    }

    // Validate user login
    @Override
    public boolean validateUser(String username, String password) {
        if (ADMIN_USERNAME.equals(username)) {
            Optional<Student> adminUser = studentrepo.findBySname(ADMIN_USERNAME);
            return adminUser.isPresent() && adminUser.get().getPassword().equals(password);
        }
        return false;
    }

    // Filter students
    @Override
    public List<Student> filterStudents(Integer filterBySno, String filterBySname) {
        if (filterBySno == null && (filterBySname == null || filterBySname.isEmpty())) {
            return studentrepo.findAll(); // Return all if no filters
        }
        if (filterBySno != null && filterBySname != null && !filterBySname.isEmpty()) {
            return studentrepo.findBySnoAndSnameContaining(filterBySno, filterBySname);
        }
        if (filterBySno != null) {
            return studentrepo.findBySno(filterBySno);
        }
        if (filterBySname != null && !filterBySname.isEmpty()) {
            return studentrepo.findBySnameContaining(filterBySname);
        }
        return studentrepo.findAll(); // Default return all
    }

    // Sort students
    @Override
    public List<Student> getSortedStudents(String sortBy, String order) {
        List<Student> students = (List<Student>) studentrepo.findAll();
        if (sortBy != null) {
            Comparator<Student> comparator = switch (sortBy) {
                case "sno" -> Comparator.comparing(Student::getSno);
                case "sname" -> Comparator.comparing(student -> student.getSname().toLowerCase());
//                case "saddress" -> Comparator.comparing(student -> student.getSaddress().toLowerCase());
                case "saddress" -> Comparator.comparing(
                	    student -> Optional.ofNullable(student.getSaddress()).orElse("").toLowerCase()
                	);

//                case "fees" -> Comparator.comparing(Student::getFees);
                case "fees" -> Comparator.comparing(
                	    student -> Optional.ofNullable(student.getFees()).orElse(0)
                	);

                default -> throw new IllegalArgumentException("Invalid sortBy parameter");
            };

            if ("desc".equalsIgnoreCase(order)) {
                comparator = comparator.reversed();
            }
            students = students.stream().sorted(comparator).collect(Collectors.toList());
        }
        return students;
    }

    // Reset password
    @Override
    public boolean resetPassword(String token, String newPassword) {
        Optional<Student> studentOpt = studentrepo.findByResetToken(token);
        if (studentOpt.isPresent()) {
            Student student = studentOpt.get();
            if (student.getResetTokenExpiry().isAfter(LocalDateTime.now())) {
                student.setPassword(newPassword);
                student.setResetToken(null);
                student.setResetTokenExpiry(null);
                studentrepo.save(student);
                return true;
            }
        }
        return false;
    }

    // Initiate password reset
    @Override
    public boolean initiatePasswordReset(String email) {
        Optional<Student> studentOpt = studentrepo.findByEmail(email);
        if (studentOpt.isPresent()) {
            Student student = studentOpt.get();
            String token = generateResetToken();
            student.setResetToken(token);
            student.setResetTokenExpiry(LocalDateTime.now().plusHours(24));
            studentrepo.save(student);

            // Send reset email
            sendResetEmail(student.getEmail(), token);
            return true;
        }
        return false;
    }

    // Generate reset token
    private String generateResetToken() {
        return UUID.randomUUID().toString();
    }

    // Send reset email
    private void sendResetEmail(String email, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Password Reset Request");
        message.setText("To reset your password, click the following link: "
                + "http://localhost:5173/reset-password?token=" + token);
        mailSender.send(message);
    }

    // Send email with custom subject and message
    @Override
    public boolean sendEmail(String recipientEmail, String subject, String messageBody) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(recipientEmail);
            message.setSubject(subject);
            message.setText(messageBody);
            mailSender.send(message);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}


