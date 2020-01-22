import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../_models';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(public http: HttpClient) {}

  addAdmin(admin: User) {
    // const tokenValue = "Bearer " + token;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
        // Authorization: tokenValue
      })
    };

    console.log(environment.apiUrl + '/registeradmin');
    return this.http
      .post<any>(environment.apiUrl + '/registeradmin', admin, httpOptions)
      .pipe(
        map(
          data => {
            console.log('POST Request', data);
            return data;
          },
          error => {
            console.log('Error', error);
          }
        )
      );
  }

  getAdmins(token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const tokenValue = 'Bearer ' + token;
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //     Authorization: tokenValue
    //   })
    // };
    return this.http.get<any>(environment.apiUrl + '/admins', httpOptions);
  }

  getAdminById(id: number) {
    console.log(`${environment.apiUrl}/admins/${id}`);
    return this.http.get<User>(`${environment.apiUrl}/admins/${id}`);
  }
}
