import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../_models";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";

import { appConfig } from "../app.config";

@Injectable()
export class UserService {
  constructor(public http: HttpClient) {}

  addAdmin(admin: User) {
    // const tokenValue = "Bearer " + token;
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json"
        // Authorization: tokenValue
      })
    };

    console.log(appConfig.apiUrl + "/registeradmin");
    return this.http
      .post<any>(appConfig.apiUrl + "/registeradmin", admin, httpOptions)
      .subscribe(
        data => {
          console.log("POST Request", data);
        },
        error => {
          console.log("Error", error);
        }
      );
  }

  getAdmins(token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    const tokenValue = "Bearer " + token;
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //     Authorization: tokenValue
    //   })
    // };
    return this.http.get<any>(appConfig.apiUrl + "/admins", httpOptions);
  }

  getAdminById(id: number) {
    return this.http.get<User>(`${environment.apiUrl}/admins/${id}`);
  }
}
