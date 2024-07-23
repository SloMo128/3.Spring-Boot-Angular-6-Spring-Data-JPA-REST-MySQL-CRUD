package com.springrestmysql.customer.repo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import com.springrestmysql.customer.model.Customer;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends 
	PagingAndSortingRepository<Customer, Long>, 
	CrudRepository<Customer, Long> {
	
		Slice<Customer> findByName(String name, Pageable pageable);
		
		Slice<Customer> findByAge(int age, Pageable pageable);
		
		List<Customer> findByNameButNotActive(String name);
}
