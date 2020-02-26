import { Component, OnInit, HostListener } from '@angular/core';

import { AuthenticationService } from './_services';
import { User, MainMenu, SubMenu } from './_models';
import { BaseService } from './_services/base.service';
import { BasketService } from './_services/basket.service';
import { SideNavService } from './_services/side_nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentUser: User;
  menu: MainMenu[] = [];
  menuId: SubMenu[] = [];
  menuString: string;
  isShow: boolean;
  opened: boolean;
  productsInBasket: number;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth >= 768) {
      this.sideNavService.changeShowHideMenu(false);
    }
  }
  constructor(
    private authenticationService: AuthenticationService,
    private basketService: BasketService,
    private baseService: BaseService,
    private sideNavService: SideNavService ) {
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
      if (this.currentUser != null) {
        console.log(this.currentUser.name);
      }
    });
  }

  ngOnInit(): void {
    this.productsInBasket = 0;
    this.sideNavService.currentState.subscribe(state => (this.opened = state));
    this.basketService.currentbasket.subscribe(basket => {
      this.productsInBasket = basket.length;
    });

    this.isShow = false;
    this.baseService.getMenu()
      .subscribe(menu => {
        this.menu = menu.sort((a, b) => a.id - b.id);
        this.menu.forEach(m => {
          m.submenu.forEach(s => {
            this.menuId.push(s);
          });
        });
        console.log(this.menuId);
        // this.createMenu();
      });
  }
  hideMenu(){
    this.sideNavService.changeShowHideMenu(false);
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

  onActivate(event) {
        const scrollToTop = window.setInterval(() => {
            const pos = window.pageYOffset;
            if (pos > 0) {
                window.scrollTo(0, pos - 20); // how far to scroll on each step
            } else {
                window.clearInterval(scrollToTop);
            }
        }, 16);
    }
}
