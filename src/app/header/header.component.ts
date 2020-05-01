import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MainMenu, User, SubMenu } from '../_models';
import { AuthenticationService } from '../_services';
import { BasketService } from '../_services/basket.service';
import { BaseService } from '../_services/base.service';
import { SideNavService } from '../_services/side_nav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

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
    this.baseService.getMenu().subscribe((res) => {
      console.log(res);
      this.menu = res;
      this.createMenu();
    });
    }

  ngOnInit() {
    console.log('ngOnInit');
    this.opened = false;
    this.sideNavService.changeShowHideMenu(this.opened);
    this.sideNavService.currentState.subscribe(state => this.opened = state);
    this.productsInBasket = 0;
    this.basketService.currentBasket.subscribe(basket => {
      this.productsInBasket = basket.length;
    });

  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
  }
  menuShow() {
    this.opened = !this.opened;
    this.sideNavService.changeShowHideMenu(this.opened);
  }
  hideMenu() {
    this.isMenuShow = false;
    console.log(this.isMenuShow);
  }
  changeCategory(categoriId: SubMenu) {
    this.sideNavService.changeCategory(categoriId);
    this.sideNavService.changeShowHideMenu(false);
  }
  drop() {
    this.isShow = true;
  }

  dropOut() {
    this.isShow = false;
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
