import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';

import { AlertModule } from './_alert';
import { AppRoutingModule } from './app-routing.module';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { CarouselHolderComponent } from './carousel-holder/carousel-holder.component';

import { MainComponent } from './main/main.component';
import { LoginComponent } from './admin/login/login.component';
import { RegisterComponent } from './admin/register/register.component';
import { HomeComponent } from './admin/home/home.component';
import { MasterComponent } from './admin/master/master.component';
import { MenuDetailComponent } from './admin/menu-settings/menu-detail/menu-detail.component';
import { MenuSaveComponent } from './admin/menu-settings/menu-save/menu-save.component';
import { ShopComponent } from './shop/shop.component';
import { AddProductsComponent } from './admin/add-products/add-products.component';

// used to create fake backend
import { UserService } from './_services/user.service';
import { BaseService } from './_services/base.service';
import { WINDOW_PROVIDERS } from './_services/window.service';
import { fakeBackendProvider } from './_helpers';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppHeaderComponent } from './app-header/app-header.component';
import { MenuSettingsComponent } from './admin/menu-settings/menu-settings.component';

// MATERIAL COMPONENTS
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CartComponent } from './cart/cart.component';
import { BasketService } from './_services/basket.service';
import { HeaderComponent } from './header/header.component';
// import { LocationStrategy, HashLocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    CarouselHolderComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    HomeComponent,
    MasterComponent,
    AppHeaderComponent,
    MenuSettingsComponent,
    MenuDetailComponent,
    MenuSaveComponent,
    ShopComponent,
    AddProductsComponent,
    CartComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ImageCropperModule,
    CarouselModule,
    ReactiveFormsModule,
    HttpClientModule,
    AlertModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    MatButtonModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [
    BaseService,
    BasketService,
    UserService,
    WINDOW_PROVIDERS,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // { provide: LocationStrategy, useClass: HashLocationStrategy },
    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
