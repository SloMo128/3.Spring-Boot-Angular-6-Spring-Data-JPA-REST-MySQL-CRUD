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
    searchForm: FormGroup;

    constructor(
        private customerService: CustomerApiService,
        private router: Router,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.searchForm = this.fb.group({
            searchAge: [''],
            searchName: [''],
        });
    }

    findByAge() {
        const searchAgeValue = this.searchForm.controls.searchAge.value;
        this.customer = [];
        this.customerService.findByAge(searchAgeValue).subscribe({
            next: (data: Customer[]) => {
                this.customer = data;
                this.searchForm = this.fb.group({
                    searchName: [''],
                });
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
        const searchNameValue = this.searchForm.controls.searchName.value;
        this.customer = [];
        this.customerService.findByName(searchNameValue).subscribe({
            next: (data: Customer[]) => {
                this.customer = data;
                this.searchForm = this.fb.group({
                    searchAge: [''],
                });
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

    toggleActive(customer, index){
        customer.active = !customer.active
    }

    reset(){
        this.searchForm = this.fb.group({
            searchAge: [''],
            searchName: [''],
        });
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
