package com.nt.model;

import java.io.Serializable;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
//import jakarta.annotation.Generated;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;


@Data
@Entity
@Table(name="student")
@AllArgsConstructor
@RequiredArgsConstructor
public class Student implements Serializable{
	@Id
	@SequenceGenerator(
	    name = "gen1",
	    sequenceName = "student_sno_seq", // Matches the database sequence name
	    initialValue = 1,                // Starts from 1
	    allocationSize = 1               // Prevents Hibernate from pre-allocating IDs
	)
	@GeneratedValue(generator = "gen1", strategy = GenerationType.SEQUENCE)

	private Integer sno;

	
	@Column(length = 20)
	private String sname;
	
	@Column(length = 20)
	private String saddress;

	private Integer fees;
	 private LocalDateTime addDate;
	    private LocalDateTime lastModifiedDate;
	    
		
	    private String email;
	    
	    private String password;
	private String resetToken;
    private LocalDateTime resetTokenExpiry;
}
