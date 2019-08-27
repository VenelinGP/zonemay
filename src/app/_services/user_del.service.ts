import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../_models";

import { environment } from "../../environments/environment";

@Injectable({ providedIn: "root" })
export class UserService {
  constructor(private http: HttpClient) {}

  getById(id: number) {
    console.log(`${environment.apiUrl}/users/${id}`);
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }
}
