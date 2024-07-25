import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Customer } from '../Model/customer.model';
@Injectable()
export class CustomerApiService {

    baseURL: string = "http://localhost:8080/spring-rest-api/";

    constructor(private http: HttpClient) { }

    getCustomer(params: HttpParams): Observable<Customer[]> {
        return this.http.get<Customer[]>(this.baseURL + 'list', { params })
    }
    
    getEdit(id: string): Observable<Customer> {
        return this.http.get<Customer>(this.baseURL + 'put/' + id)
    }

    update(id: string, user: Customer): Observable<Customer> {
        const headers = { 'content-type': 'application/json' }
        const body = JSON.stringify(user);
        return this.http.put<Customer>(this.baseURL + 'put/' + id, body, { 'headers': headers })
    }

    deleteUser(id: string): Observable<Customer> {
        return this.http.delete<Customer>(this.baseURL + 'delite/' + id)
        //.pipe(catchError((err) => this.handleError('DELETE', err)));
    }

    add(user: Customer): Observable<Customer> {
        const headers = { 'content-type': 'application/json' }
        const body = JSON.stringify(user);
        console.log(body)
        return this.http.post<Customer>(this.baseURL + 'add', body, { 'headers': headers })
        //.pipe(catchError((err) => this.handleError('POST', err)));
    }

    findByAge(age: string, params: HttpParams): Observable<Customer[]> {
        return this.http.get<Customer[]>(this.baseURL + 'age/' + age, {params});
    }

    findByName(name: string, params: HttpParams): Observable<Customer[]> {
        return this.http.get<Customer[]>(this.baseURL + 'name/' + name, {params});
    }
}