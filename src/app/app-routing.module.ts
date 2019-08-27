import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainComponent } from "./main/main.component";
import { LoginComponent } from "./admin/login/login.component";
import { RegisterComponent } from "./admin/register/register.component";
import { AuthGuard } from "./_helpers";
import { HomeComponent } from "./admin/home/home.component";
import { MasterComponent } from "./admin/master/master.component";
import { Role } from "./_models";

const routes: Routes = [
  { path: "", redirectTo: "main", pathMatch: "full" },
  { path: "main", component: MainComponent },
  { path: "admin", redirectTo: "admin/login" },
  { path: "admin/login", component: LoginComponent },
  { path: "admin/register", component: RegisterComponent },
  { path: "admin/home", component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: "admin/master",
    component: MasterComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
