import { Component, OnInit } from '@angular/core';
import { FeedBack } from '../../Model/feedback';
import { Router } from '@angular/router';
import { Customer } from 'src/app/Model/customer.model';
import { CustomerApiService } from 'src/app/Service/service';
import { HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-list',
  templateUrl: './list.customer.html',
})
export class ListComponent implements OnInit {

  customer: Customer[] = []
  feedback = new FeedBack("", "");
  isLoading: boolean = false;
  searchForm: FormGroup;

  totalCustomers: number = 0;
  pagination: number = 0;
  customerPage: number = 5;
  sortField: string = "name";
  sortOrder: string = "DESC";
  page = this. sortOrder
  chengePageIco: boolean = false

  constructor(
    private customerService: CustomerApiService,
    private router: Router,

  ) { }

  ngOnInit() {}

  pageDirection(page){
    this.getList(page);
  }

  getList(page): void {
    let params = new HttpParams;
    this.customer = [];

    params = params.append('page', "" + this.pagination);
    params = params.append('size', "" + this.customerPage);
    params = params.append('sort', this.sortField);
    params = params.append('order', page)

    this.customerService.getCustomer(params).subscribe({
      next: (data: any) => {
        if (data.length !== 0) {
          this.customer = data.customers;
          this.totalCustomers = data.count;
          console.log(this.customer);
        };
        this.isLoading = true;
      },
      error: (err: any) => {
        this.isLoading = false;
        console.log(err);
        this.feedback = {
          feedbackType: err.feedbackType,
          feedbackmsg: err.feedbackmsg,
        };
        console.log(JSON.stringify(this.feedback));
        throw new Error();
      },
      complete: () => {
        this.isLoading = true;
        this.feedback = { feedbackType: 'success', feedbackmsg: 'loaded' };
      },
    });
  }

  renderPage(event: number) {
    this.pagination = event - 1;
    this.getList(this.sortOrder);
  }

  toggleActive(customer, index) {
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

  /*saveDataAndNavigate(id: string) {
    localStorage.setItem('userId', id);
    this.router.navigate(['/editUser/']);
  }*/
}

