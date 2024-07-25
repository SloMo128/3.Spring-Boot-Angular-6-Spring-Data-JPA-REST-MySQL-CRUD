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
	int countByAge(int age);

	Page<Customer> findByNameButNotActiveASC(String name, Pageable pageable);
	Page<Customer> findByNameButNotActiveDESC(String name, Pageable pageable);

	Page<Customer> getCustByName(String name, Pageable paging);
}
