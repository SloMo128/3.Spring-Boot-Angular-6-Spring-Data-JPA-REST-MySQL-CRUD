package com.springrestmysql.customer.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Column;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GenerationType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.*;

@Entity
@Table(name = "spring_customer")
@NamedQuery(name = "Customer.findByNameButNotActive", query = "SELECT c FROM Customer c WHERE c.name = (?1) and c.active= false")
public class Customer {

	@Id
	//@GeneratedValue(strategy = GenerationType.AUTO)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "cust_seq")
    @SequenceGenerator(initialValue = 1, name = "cust_seq", sequenceName = "spring_customer_sequence")
	private long id;

	@Column(name = "full_name")
	private String name;

	@Column(name = "age")
	private int age;

	@Column(name = "active")
	private boolean active;

	public Customer() {
	}

	public Customer(String name, int age) {
		this.name = name;
		this.age = age;
		this.active = false;
	}

	public Customer(String name, int age, boolean active) {
		this.name = name;
		this.age = age;
		this.active = active;
	}

	public long getId() {
		return id;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getName() {
		return this.name;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public int getAge() {
		return this.age;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	@Override
	public String toString() {
		return "Customer [id=" + id + ", name=" + name + ", age=" + age + ", active=" + active + "]";
	}
}