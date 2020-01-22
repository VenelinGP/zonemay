import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from './../../_services';
import { AlertService, AlertTime } from 'src/app/_alert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = { status: false, message: '' };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    if (this.authenticationService.currentUserValue) {
      console.log('Login: ', this.authenticationService.currentUserValue);
      this.router.navigate(['admin/menu']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
    this.returnUrl = 'admin/menu';
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit(username, password) {
    this.submitted = true;

    // stop here if form is invalid
    // if (this.loginForm.invalid) {
    //   return;
    // }
    if (username === '' || password === '') {
      return;
    }
    console.log('U: ' + username + ' | ' + 'P: ' + password);
    this.loading = true;
    this.authenticationService
      .login(username, password)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl])
          console.log('Logged: ', data);
          if (data.status === false) {
            this.errorMess(data.message);
          }
        },
        error => {
          this.error = error;
          this.loading = false;
        }
      );
  }
  errorMess(message: string) {
    this.alertService.error(message);
    setTimeout(() => {
      this.alertService.clear();
    }, AlertTime.Long);
  }
}
