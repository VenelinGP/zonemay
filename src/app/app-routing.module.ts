import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './admin/login/login.component';
import { RegisterComponent } from './admin/register/register.component';
import { AuthGuard } from './_helpers';
import { HomeComponent } from './admin/home/home.component';
import { MasterComponent } from './admin/master/master.component';
import { Role } from './_models';
import { MenuResolve } from './_services/base/menu.resolve';
import { MenuSettingsComponent } from './admin/menu-settings/menu-settings.component';
import { MenuDetailComponent } from './admin/menu-settings/menu-detail/menu-detail.component';
import { AddProductsComponent } from './admin/add-products/add-products.component';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: MainComponent, resolve: { menu: MenuResolve } },
  { path: 'shop', component: ShopComponent, resolve: { menu: MenuResolve } },
  { path: 'admin', redirectTo: 'admin/login' },
  { path: 'admin/login', component: LoginComponent },
  { path: 'admin/register', component: RegisterComponent },
  { path: 'admin', component: HomeComponent, canActivate: [AuthGuard], children: [
    { path: '', redirectTo: 'menu', pathMatch: 'full'},
    { path: 'menu', component: MenuSettingsComponent, canActivate: [AuthGuard], resolve: { menu: MenuResolve } },
    { path: 'products', component: AddProductsComponent, canActivate: [AuthGuard], resolve: { menu: MenuResolve } },
    { path: 'admin/master', component: MasterComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
    { path: 'detail/:id', component: MenuDetailComponent, canActivate: [AuthGuard] },
  ]},
  { path: '**', redirectTo: 'main' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
