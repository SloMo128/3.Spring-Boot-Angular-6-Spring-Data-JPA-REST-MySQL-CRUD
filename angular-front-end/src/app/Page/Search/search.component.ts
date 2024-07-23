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
            search: [''],
        });
    }

    filter() {

        const searchValue = this.searchForm.controls.search.value;
        this.customer = [];
        this.customerService.findByQueryOneSearch(searchValue).subscribe({
            next: (data: Customer[]) => {
                this.customer = data;
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
