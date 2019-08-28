import { Component, OnInit } from "@angular/core";
import { first } from "rxjs/operators";

import { User } from "../../_models";
import { AuthenticationService, UserService } from "../../_services";
import { AlertService } from "src/app/_alert";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  loading = false;
  currentUser: User;
  userFromApi: User;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.loading = true;
    this.userService
      .getAdminById(this.currentUser.id)
      .pipe(first())
      .subscribe(user => {
        this.loading = false;
        this.userFromApi = user;
      });
  }
}
