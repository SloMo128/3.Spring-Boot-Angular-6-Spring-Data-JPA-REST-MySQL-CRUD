import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Customer } from 'src/app/Model/customer.model';
import { CustomerApiService } from 'src/app/Service/service';
import { FeedBack } from 'src/app/Model/feedback';

@Component({
    templateUrl: './edit.customer.html',
})

export class EditComponent implements OnInit {

    editForm: FormGroup;
    customer: Customer[] = []
    feedback = new FeedBack("", "");
    data: string;
    isLoading: boolean = true;

    constructor(
        private customerService: CustomerApiService,
        private fb: FormBuilder,
        private router: Router,
    ) { }

    ngOnInit() {

        this.feedback = { feedbackType: '', feedbackmsg: '' };

        this.data = localStorage.getItem('userId');
        if (!this.data) {
            alert("Something wrong!");
            this.router.navigate(['']);
            return;
        }

        this.editForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10),
            Validators.pattern("^[a-zA-Z]+$")]],
            age: ['', [Validators.required, Validators.min(1), Validators.max(120), Validators.pattern("[0-120]")]]

        });

        this.loadForm(this.data);
    }

    loadForm(id: string) {
        this.customerService.getEdit(id).subscribe({
            next: (data: Customer) => {
                console.log(data);
                this.editForm.setValue({
                    name: data.name,
                    age: data.age
                });
                this.isLoading = false; // Assicurati di impostare isLoading su false quando i dati sono caricati
            },
            error: (err: any) => {
                console.log(err);
                this.isLoading = false;
                this.feedback = {
                    feedbackType: err.feedbackType,
                    feedbackmsg: err.feedbackmsg,
                };
            },
            complete: () => {},
        });
    }

    onSubmit() {
        this.customerService.update(this.data , this.editForm.value).subscribe({
          next: (data) => {
            this.feedback = { feedbackType: 'success', feedbackmsg: 'Person updated successfully!' };
            setTimeout(() => this.router.navigate(['/list']), 4000);
    
            localStorage.removeItem('userId');
          },
          error: (err: any) => {
            console.log(err);
            this.isLoading = false;
            this.feedback = {
                feedbackType: err.feedbackType,
                feedbackmsg: err.feedbackmsg,
            };
          },
          complete: () => {
          },
        });
      }

    get name() {
        return this.editForm.get('name');
    }

    get age() {
        return this.editForm.get('age');
    }
}
