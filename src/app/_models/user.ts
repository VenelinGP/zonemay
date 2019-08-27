import { Role } from "./role";
export class User {
  id?: number;
  username: String;
  email?: String;
  password: String;
  name: String;
  role: Role;
  token?: string;
}
