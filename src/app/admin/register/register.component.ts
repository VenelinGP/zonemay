import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { User, Role } from 'src/app/_models/';
import { first } from 'rxjs/operators';
import { AlertService, AlertTime } from 'src/app/_alert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private role: Role = Role.Fake;

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit() {}

  signUp(username: string, password: string, name: string, email: string) {
    console.log('Sign Up');

    const newUser: User = {
      username,
      email,
      password,
      name,
      role: this.role
    };
    console.log(newUser);
    this.userService
      .addAdmin(newUser)
      .pipe(first())
      .subscribe(data => {
        console.log(data);
        if (data.status === true) {
          this.successMess(data.message);
        } else {
          this.errorMess(data.message);
        }
      });
  }
  successMess(message: string) {
    this.alertService.success(message);
    setTimeout(() => {
      this.alertService.clear();
      this.router.navigate(['admin/login']);
    }, AlertTime.Long);
  }
  errorMess(message: string) {
    this.alertService.error(message);
    setTimeout(() => {
      this.alertService.clear();
    }, AlertTime.Long);
  }
}
