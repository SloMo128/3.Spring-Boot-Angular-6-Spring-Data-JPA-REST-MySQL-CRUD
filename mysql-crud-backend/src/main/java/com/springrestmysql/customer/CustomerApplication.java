package com.springrestmysql.customer;

import java.util.stream.Stream;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.springrestmysql.customer.model.Customer;
import com.springrestmysql.customer.repo.CustomerRepository;

@SpringBootApplication
public class CustomerApplication {

	public static void main(String[] args) {
		SpringApplication.run(CustomerApplication.class, args);
	}
	/*
	@Bean
	CommandLineRunner init(CustomerRepository customerRepository) {
		return args -> {
			Stream.of("Ellie", "Joel", "Sarah", "Maria", "Tommy", "Tess", "Abby", 
					  "Marlene", "Bill", "Henry", "Sam", "Frank", "Riley", "Dina", 
					  "Jesse", "Lev", "Yara", "Manny", "Jerry", "Owen" )
			.forEach(name -> {
				Customer customer = new Customer(name, (int) (Math.random() * (100 - 18) + 18), Math.random() < 0.9) ;
				customerRepository.save(customer);
			});
			customerRepository.findAll().forEach(System.out::println);
		};
	}*/
}
