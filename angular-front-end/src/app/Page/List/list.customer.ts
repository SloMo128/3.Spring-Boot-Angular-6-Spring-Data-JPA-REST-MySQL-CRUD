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

  constructor(
    private customerService: CustomerApiService,
    private router: Router,

  ) { }

  ngOnInit() {
    this.getUsers()
  }


  getUsers(): void {
    this.customer = [];
    this.customerService.getUsers().subscribe({
      next: (data: Customer[]) => {
        if (data.length !== 0) {
          this.customer = data;
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

  /*saveDataAndNavigate(id: string) {
    localStorage.setItem('userId', id);
    this.router.navigate(['/editUser/']);
  }*/
}

