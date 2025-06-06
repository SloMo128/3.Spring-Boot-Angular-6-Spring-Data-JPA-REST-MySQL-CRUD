package com.springrestmysql.customer.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.springrestmysql.customer.model.Customer;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends PagingAndSortingRepository<Customer, Long>, CrudRepository<Customer, Long> {

	Page<Customer> findByAge(int age, Pageable pageable);

	Page<Customer> findByNameButNotActive(String name, Pageable pageable);
}
