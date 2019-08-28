import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { MDBBootstrapModule } from "angular-bootstrap-md";

import { AppComponent } from "./app.component";

import { AlertModule } from "./_alert";
import { AppRoutingModule } from "./app-routing.module";

import { LoginComponent } from "./admin/login/login.component";
import { RegisterComponent } from "./admin/register/register.component";
import { MainComponent } from "./main/main.component";
import { UserService } from "./_services/user.service";
import { HomeComponent } from "./admin/home/home.component";
import { MasterComponent } from "./admin/master/master.component";

// used to create fake backend
import { fakeBackendProvider } from "./_helpers";
import { JwtInterceptor, ErrorInterceptor } from "./_helpers";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    HomeComponent,
    MasterComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AlertModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
