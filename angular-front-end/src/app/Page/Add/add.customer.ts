import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Customer } from 'src/app/Model/customer.model';
import { CustomerApiService } from 'src/app/Service/service';
import { FeedBack } from 'src/app/Model/feedback';

@Component({
    templateUrl: './add.customer.html',
})

export class AddComponent implements OnInit {

    feedback = new FeedBack("", "");
    addForm: FormGroup;
    isLoading: boolean = true;


    constructor(
        private customerService: CustomerApiService,
        private fb: FormBuilder,
        private actRoute: ActivatedRoute,
        private router: Router,
    ) {}

    ngOnInit() {

        localStorage.removeItem('userId');

        this.feedback = { feedbackType: '', feedbackmsg: '' };

        this.addForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10),
            Validators.pattern("^[a-zA-Z]+$")]],
            age: ['', [Validators.required, Validators.min(1), Validators.max(120), Validators.pattern("^[0-9]+$")]],
            active: [false]
        });
    }

    onSubmit() {
        if (window.confirm("Are you sure you want to create this new user?")) {
            this.customerService.add(this.addForm.value).subscribe({
                next: (data) => {
                    this.feedback = { feedbackType: 'success', feedbackmsg: 'Person created successfully' };
                    setTimeout(() => this.router.navigate(['/list']), 4000); // Navigate to the list or some other view
                },
                error: (err: any) => {
                    console.log(err);
                    this.isLoading = false;
                    this.feedback = {
                        feedbackType: err.feedbackType,
                        feedbackmsg: err.feedbackmsg,
                    };
                    throw new Error();
                },
                complete: () => {
                    this.isLoading = true;
                },
            });
        } else { }
    }

    get name() {
        return this.addForm.get('name');
    }

    get age() {
        return this.addForm.get('age');
    }

    get active() {
        return this.addForm.get('active');
    }
}
