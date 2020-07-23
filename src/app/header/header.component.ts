import { Component, OnInit } from '@angular/core';
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
export class HeaderComponent implements OnInit {

  currentUser: User;
  menu: MainMenu[] = [];
  col0 = [];
  col1 = [];
  col2 = [];
  col3 = [];
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
      this.menu = res;
      this.createMenu();
    });
    }

  ngOnInit() {
    this.opened = false;
    this.sideNavService.changeShowHideMenu(this.opened);
    this.sideNavService.currentState.subscribe(state => this.opened = state);
    this.productsInBasket = 0;
    this.basketService.currentBasket.subscribe(basket => {
      this.productsInBasket = basket.length;
    });

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
    this.menuString = '';
    const flatMenu = [];
    this.menu.sort((a, b) => a.id - b.id);
    for (const mainmenu of this.menu) {
      let item = {_id: mainmenu._id, id: mainmenu.id, name: mainmenu.name, flag: 'm'};
      flatMenu.push(item);
      mainmenu.submenu.forEach( sub => {
        item = {_id: sub._id, id: sub.id, name: sub.name, flag: 's' };
        flatMenu.push(item);
      });
    }
    for (let i = 0; i < flatMenu.length; i++) {
      const element = flatMenu[i];
      if ( i < 10) {
        this.col0.push(element);
      } else if (i >= 10 && i < 20) {
        this.col1.push(element);
      } else if (i >= 20 && i < 30) {
        this.col2.push(element);
      } else if (i >= 30 && i < 40) {
        this.col3.push(element);
      }
    }
  }
}
