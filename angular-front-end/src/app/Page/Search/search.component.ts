import { Component, OnInit } from '@angular/core';
import { FeedBack } from 'src/app/Model/feedback';
import { Router } from '@angular/router';
import { Customer } from 'src/app/Model/customer.model';
import { CustomerApiService } from 'src/app/Service/service';
import { HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {

    customer: Customer[] = []
    feedback = new FeedBack("", "");
    isLoading: boolean = false;
    searchFormName: FormGroup;
    searchFormAge: FormGroup;
    totalCustomers: number = 0;
    pagination: number = 0;
    customerPage: number = 5;
    sortField: string = "name";
    sortOrder: string = "DESC";

    constructor(
        private customerService: CustomerApiService,
        private router: Router,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.searchFormName = this.fb.group({
            searchName: ['']
        });
        this.searchFormAge = this.fb.group({
            searchAge: ['']
        });
    }

    pageDirection() {
        this.sortOrder = this.sortOrder === 'ASC' ? 'DESC' : 'ASC';
        if(this.searchFormAge.controls.searchAge.value){
            this.findByAge();
        }else{
            this.findByName();
        }
    }

    findByAge() {
        let params = new HttpParams;
        this.customer = [];

        params = params.append('page', "" + this.pagination);
        params = params.append('size', "" + this.customerPage);
        params = params.append('sort', this.sortField);
        params = params.append('order', this.sortOrder);

        const searchAgeValue = this.searchFormAge.controls.searchAge.value;

        this.customer = [];
        this.customerService.findByAge(searchAgeValue, params).subscribe({
            next: (data: any) => {
                this.customer = data.customers;
                this.totalCustomers = data.count;
                
                this.feedback = { feedbackType: 'success', feedbackmsg: 'Filtered' };
            },
            error: (err: any) => {
                this.isLoading = false;
                console.log(err);
                this.feedback = {
                    feedbackType: err.feedbackType,
                    feedbackmsg: err.feedbackmsg,
                };
            }
        });
    }

    findByName() {
        let params = new HttpParams;
        this.customer = [];

        params = params.append('page', "" + this.pagination);
        params = params.append('size', "" + this.customerPage);
        params = params.append('sort', this.sortField);
        params = params.append('order', this.sortOrder);

        const searchNameValue = this.searchFormName.controls.searchName.value;

        this.customer = [];
        this.customerService.findByName(searchNameValue, params).subscribe({
            next: (data: any) => {
                this.customer = data.customers;
                this.totalCustomers = data.count;
                
                this.feedback = { feedbackType: 'success', feedbackmsg: 'Filtered' };
            },
            error: (err: any) => {
                this.isLoading = false;
                console.log(err);
                this.feedback = {
                    feedbackType: err.feedbackType,
                    feedbackmsg: err.feedbackmsg,
                };
            }
        });
    }

    renderPage(event: number) {
        this.pagination = event - 1;
        if(this.searchFormAge.controls.searchAge.value){
            this.findByAge();
        }else{
            this.findByName();
        }
    }

    toggleActive(customer, index) {
        customer.active = !customer.active
    }

    reset() {
        this.searchFormName = this.fb.group({
            searchName: ['']
        });
        this.searchFormAge = this.fb.group({
            searchAge: ['']
        });
        this.customer = [];

        this.feedback = {
            feedbackType: "success",
            feedbackmsg: "Rest",
        };

    }

    deleteUser(id: string, index) {
        if (window.confirm("Are you sure you want to delete this product?")) {
            this.customerService.deleteUser(id).subscribe({
                next: (data) => {
                    this.customer.splice(index, 1);
                },
                error: (err: any) => {
                    this.isLoading = false;
                    console.log(err);
                    this.feedback = {
                        feedbackType: err.feedbackType,
                        feedbackmsg: err.feedbackmsg,
                    };
                    throw new Error();
                }
            });
        }
    }
}
