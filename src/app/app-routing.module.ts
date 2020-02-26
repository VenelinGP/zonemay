import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './admin/login/login.component';
import { RegisterComponent } from './admin/register/register.component';
import { AuthGuard } from './_helpers';
import { HomeComponent } from './admin/home/home.component';
import { MasterComponent } from './admin/master/master.component';
import { Role } from './_models';
import { MenuSettingsComponent } from './admin/menu-settings/menu-settings.component';
import { MenuDetailComponent } from './admin/menu-settings/menu-detail/menu-detail.component';
import { AddProductsComponent } from './admin/add-products/add-products.component';
import { ShopComponent } from './shop/shop.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ClientsComponent } from './admin/clients/clients.component';
import { ClientBasketComponent } from './client-basket/client-basket.component';
import { CheckoutAfterComponent } from './checkout-after/checkout-after.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'finished', component: CheckoutAfterComponent },
  { path: 'admin/login', component: LoginComponent },
  { path: 'admin/register', component: RegisterComponent },
  { path: 'admin', component: HomeComponent, canActivate: [AuthGuard], children: [
    { path: '', redirectTo: 'menu', pathMatch: 'full'},
    { path: 'menu', component: MenuSettingsComponent, canActivate: [AuthGuard] },
    { path: 'products', component: AddProductsComponent, canActivate: [AuthGuard] },
    { path: 'clients', component: ClientsComponent, canActivate: [AuthGuard] },
    { path: 'clients', component: ClientBasketComponent, canActivate: [AuthGuard] },
    { path: 'clients/:id', component: ClientBasketComponent, canActivate: [AuthGuard] },
    { path: 'master', component: MasterComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
    { path: 'detail/:id', component: MenuDetailComponent, canActivate: [AuthGuard] },
  ]},
  { path: '**', redirectTo: 'main' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 72]
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
