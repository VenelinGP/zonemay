import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MainMenu } from '../_models/mainmenu';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from '../_services/base/base.service';
import { Product } from '../_models';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  amazonServer = 'https://zonemay.s3.eu-central-1.amazonaws.com/';
  menu: MainMenu[] = [];
  menuString: string;
  rightMenu: string;
  isShow: boolean;

  products: Product[];
  constructor(
    private baseService: BaseService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.isShow = false;
    this.products = [];
    this.menu = this.route.snapshot.data.menu.message.sort((a, b) => {
      return a.id - b.id;
    });
    this.createMenu();
    this.baseService.getProducts()
      .subscribe(products => {
        this.products = products;
        this.products.map(p => p.imglink = this.amazonServer + p.imglink );
        // console.log(products);
      });
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
        this.menuString += '<li><a href="#/shop">' + sub.name + '</a></li>';
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
    console.log(this.rightMenu);
  }
  }
