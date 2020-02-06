import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MainMenu } from '../_models/mainmenu';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from '../_services/base.service';
import { Product } from '../_models';
import { BasketService } from '../_services/basket.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  amazonServer = 'https://zonemay.s3.eu-central-1.amazonaws.com/';
  menu: MainMenu[] = [];
  basket: Product[];
  menuString: string;
  rightMenu: string;
  isShow: boolean;
  showLoader = true;
  pages: number[];
  appendClassTo: any[];
  products: Product[];
  constructor(
    private baseService: BaseService,
    private basketService: BasketService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    // this.isShow = false;
    this.pages = [];
    this.products = [];
    this.appendClassTo = [];
    this.appendClassTo.push(0);
    // this.baseService.getMenu()
    //   .subscribe(menu => {
    //     this.menu = menu.sort((a, b) => a.id - b.id);
    //     this.createMenu();
    //   });

    this.menu = this.baseService.getMenuNotObservable();
    this.createMenu();

    this.baseService.getProducts()
      .subscribe(products => {
        this.products = products;
        this.products.map(p => p.imglink = this.amazonServer + p.imglink );
        this.pages = new Array(Math.round(this.products.length / 9));
        if (this.pages.length === 0) {
          this.pages = new Array(1);
        }
        this.showLoader = false;
      });
    this.basketService.currentbasket.subscribe(basket => {
      this.basket = basket;
    });
  }

  buy(product: Product) {
    product.buyingQty = 1;
    this.basket.push(product);
    console.log(this.basket);
    this.basketService.changeBasket(this.basket);
  }

  drop() {
    this.isShow = true;
  }

  dropOut() {
    this.isShow = false;
  }
  moveUp() {
    document.getElementById('top').scrollIntoView();
  }
  createMenu(): any {
    this.menuString = '';
    this.rightMenu = '';
    let i = 0;
    let k = 0;
    this.menuString += '<div class="col-3-2"><ul class="multi-column-dropdown">';
    for (const mainmenu of this.menu) {
      console.log(mainmenu);
      const currentMenuName = mainmenu.name;
      this.menuString += '<li> <div class="nav-category nav-category-bg1">' + currentMenuName + '</div></li>';
      if (mainmenu.submenu.length !== 0) {
        this.rightMenu += '<div class="sidebar-box-2"><h2 class="heading mb-4">' + currentMenuName + '</h2><ul>';
      }
      i++;
      k++;
      if ((k % (12 - i)) === 0) {
        // console.log('IF:', k, 12 - i, (k % (12 - i)));
        this.menuString += '</ul></div><div class="col-3-2"><ul class="multi-column-dropdown">';
        i = 0;
        k = 0;
      }
      mainmenu.submenu.forEach(sub => {
        this.menuString += '<li><a href=shop">' + sub.name + '</a></li>';
        this.rightMenu += '<li><a href="#">' + sub.name + '</a></li>';
        k++;

        if ((k % (12 - i)) === 0) {
          // console.log('IF:', k, 12 - i, (k % (12 - i)));
          this.menuString += '</ul></div><div class="col-3-2"><ul class="multi-column-dropdown">';
          i = 0;
          k = 0;
        }
      });
      console.log('MainMenu: ', mainmenu.submenu.length);
      if (mainmenu.submenu.length !== 0) {
        this.rightMenu += '</ul></div>';
      }
      if (mainmenu.submenu.length !== 0) {
        this.menuString += '<li class="divider"></li>';
      }
    }
    this.menuString += '</ul></div>';
    // console.log(this.rightMenu);
  }
  leftClick() {
    console.log(this.appendClassTo[0]);
    if (this.appendClassTo[0] > 0) {
      const currentPage = this.appendClassTo[0];
      this.appendClassTo.splice(0);
      this.appendClassTo.push(currentPage - 1);
    }
  }
  rightClick() {
    console.log(this.appendClassTo[0]);
    if (this.appendClassTo[0] < this.pages.length - 1) {
      const currentPage = this.appendClassTo[0];
      this.appendClassTo.splice(0);
      this.appendClassTo.push(currentPage + 1);
    }
  }
  pageClick(i: number) {
    console.log(i);
    this.appendClassTo.splice(0);
    this.appendClassTo.push(i - 1);
    console.log(this.appendClassTo[0]);
  }
}