import { Component, OnInit } from '@angular/core';
import { MainMenu, User } from '../_models';
import { AuthenticationService } from '../_services';
import { BasketService } from '../_services/basket.service';
import { BaseService } from '../_services/base.service';
import { SideNavService } from '../_services/side_nav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: User;
  menu: MainMenu[] = [];
  isMenuShow: boolean;
  opened: boolean;
  menuString: string;
  isShow: boolean;
  productsInBasket: number;
  constructor(private authenticationService: AuthenticationService,
              private basketService: BasketService,
              private baseService: BaseService,
              private sideNavService: SideNavService) {
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
      if (this.currentUser != null) {
        console.log(this.currentUser.name);
      }
    });
    }

  ngOnInit() {
    this.opened = false;
    this.sideNavService.changeState(this.opened);
    this.sideNavService.currentState.subscribe(state => this.opened = state);
    this.productsInBasket = 0;
    this.basketService.currentbasket.subscribe(basket => {
      this.productsInBasket = basket.length;
    });

  }
  menuShow() {
    this.opened = !this.opened;
    this.sideNavService.changeState(this.opened);
  }
  hideMenu() {
    this.isMenuShow = false;
    console.log(this.isMenuShow);
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
