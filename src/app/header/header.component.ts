import { Component, OnInit } from '@angular/core';
import { MainMenu, User } from '../_models';
import { AuthenticationService } from '../_services';
import { BasketService } from '../_services/basket.service';
import { BaseService } from '../_services/base.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: User;
  menu: MainMenu[] = [];
  menuString: string;
  isShow: boolean;
  productsInBasket: number;
  constructor(private authenticationService: AuthenticationService,
              private basketService: BasketService,
              private baseService: BaseService) {
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
      if (this.currentUser != null) {
        console.log(this.currentUser.name);
      }
    });
    }

  ngOnInit() {
    this.productsInBasket = 0;
    this.basketService.currentbasket.subscribe(basket => {
      this.productsInBasket = basket.length;
    });

  }

  drop() {
    this.isShow = true;
  }

  dropOut() {
    this.isShow = true;
  }

  createMenu() {
    console.log('1', this.menu);
    this.menuString = '';
    let i = 0;
    let k = 0;
    this.menuString += '<div class="col-3-2"><ul class="multi-column-dropdown">';
    for (const mainmenu of this.menu) {
      const currentMenuName = mainmenu.name;
      this.menuString += '<li> <div class="nav-category nav-category-bg1">' + currentMenuName + '</div></li>';
      i++;
      k++;
      if ((k % (12 - i)) === 0) {
        this.menuString += '</ul></div><div class="col-3-2"><ul class="multi-column-dropdown">';
        i = 0;
        k = 0;
      }
      mainmenu.submenu.forEach(sub => {
        this.menuString += '<li><a routerLink="shop">' + sub.name + '</a></li>';
        k++;
        if ((k % (12 - i)) === 0) {
          this.menuString += '</ul></div><div class="col-3-2"><ul class="multi-column-dropdown">';
          i = 0;
          k = 0;
        }
      });

      if (mainmenu.submenu.length !== 0) {
        this.menuString += '<li class="divider"></li>';
      }
    }
    this.menuString += '</ul></div>';
    console.log(this.menuString);
  }
}
