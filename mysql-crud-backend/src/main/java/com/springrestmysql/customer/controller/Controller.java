package com.springrestmysql.customer.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Sort;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.springrestmysql.customer.CustomerApplication;
import com.springrestmysql.customer.model.Customer;
import com.springrestmysql.customer.repo.CustomerRepository;

@RestController
@RequestMapping(path = "/spring-rest-api", produces = "application/json")
@CrossOrigin(origins = "http://localhost:4200") // Angular Home Page
public class Controller {
	private final  CustomerRepository repo;
	Pageable page = PageRequest.of(0, 3, Sort.by("name").descending());

	public Controller(CustomerRepository repo) {
		this.repo = repo;
	}
	
	@GetMapping("/list")
	public ResponseEntity<List<Customer>> getUsers() {
		Pageable page = PageRequest.of(0, 25, Sort.by("name").descending());
		Page<Customer> pagedResult = repo.findAll(page);

        if (pagedResult.hasContent()) {
            return new ResponseEntity<>(pagedResult.getContent(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
	
	@GetMapping("/age/{age}")
	public ResponseEntity<List<Customer>> getCustByAge(@PathVariable("age") int age) {
		Slice<Customer> slicedResult = repo.findByAge(age, page); 

		List<Customer> customerList = slicedResult.getContent();
		
		if (!customerList.isEmpty()) {
			return new ResponseEntity<>(customerList, HttpStatus.OK);
		}else {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/customer/name/{name}")
	public ResponseEntity<List<Customer>> getCustByName(@PathVariable("name") String name) {
		Slice<Customer> slicedResult = repo.findByName(name, page); 

		List<Customer> customerList = slicedResult.getContent();
		
		if (!customerList.isEmpty()) {
			return new ResponseEntity<>(customerList, HttpStatus.OK);
		}else {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping(path = "/add", consumes = "application/json")
	public ResponseEntity<Customer> postUser(@RequestBody Customer customer) {
		try {
			repo.save(customer);
			return new ResponseEntity<>(null, HttpStatus.CREATED);
		}
		catch (Exception e){
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PutMapping(path = "/put/{id}", consumes = "application/json")
	public ResponseEntity<Customer> putUser(@PathVariable("id") Long id, @RequestBody Customer customer) {
		try {
			Optional<Customer> optionalUser = repo.findById(id);
			if (optionalUser.isPresent()) {
				Customer existingUser = optionalUser.get();
				existingUser.setName(customer.getName());
				existingUser.setAge(customer.getAge());

				repo.save(existingUser);
				return new ResponseEntity<>(null, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	
	@DeleteMapping(path = "/delite/{id}")
	public ResponseEntity<String> deleteUser(@PathVariable("id") Long id) {
		try {
			repo.deleteById(id);
			return new ResponseEntity<>(null, HttpStatus.OK);
		} catch (EmptyResultDataAccessException e) {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
	}
}