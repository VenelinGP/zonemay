import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../../_models';
import { UserService } from '../../_services';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {
  loading = false;
  users: User[] = [];
  private currentToken: string;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loading = true;
    this.currentToken = localStorage.getItem('currentToken');
    this.userService
      .getAdmins(this.currentToken)
      .pipe(first())
      .subscribe(users => {
        this.loading = false;
        this.users = users;
      });
  }
}
