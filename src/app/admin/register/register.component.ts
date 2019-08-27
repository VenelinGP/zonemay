import { Component, OnInit } from "@angular/core";
import { UserService } from "../../_services/user.service";
import { User, Role } from "src/app/_models/";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  private role: Role = Role.Fake;

  constructor(private userService: UserService) {}

  ngOnInit() {}

  signUp(username: string, password: string, name: string, email: string) {
    console.log("Sign Up");

    let newUser: User = {
      username: username,
      email: email,
      password: password,
      name: name,
      role: this.role
    };
    console.log(newUser);
    this.userService.addAdmin(newUser);
  }
}
