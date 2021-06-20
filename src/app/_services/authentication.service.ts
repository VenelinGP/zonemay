import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private currentError = '';

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    console.log('URL:' + environment.apiUrl + '/authenticate');
    return this.http
      .post<any>(environment.apiUrl + '/authenticate', {username,password},httpOptions
      )
      .pipe(
        map(res => {
          console.log(res);
          if (res.status) {
            const user = res.user;
            console.log(res.status);
            if (user && user.token) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
              localStorage.setItem('currentToken', JSON.stringify(user.token));
              localStorage.setItem('currentRole', JSON.stringify(user.role));
              this.currentUserSubject.next(res.user);
            }
            // login successful if there's a jwt token in the response
            return { status: true, message: user };
          }
          if (!res.status) {
            return res;
          }
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentToken');
    localStorage.removeItem('currentRole');
    this.currentUserSubject.next(null);
  }
}
