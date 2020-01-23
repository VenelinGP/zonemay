import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { WINDOW } from './../_services/window.service';
import {
  bounceInLeftAnimation,
  bounceInUpAnimation,
  bounceInRightAnimation,
  bounceInLeftOnEnterAnimation,
  bounceInUpOnEnterAnimation,
  flipInXAnimation
} from 'angular-animations';
// import { menu } from '../test-base/menu';
import { BaseService } from '../_services/base.service';
import { ActivatedRoute } from '@angular/router';
import { MainMenu } from '../_models/mainmenu';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    bounceInLeftAnimation(),
    bounceInUpAnimation(),
    bounceInRightAnimation(),
    bounceInLeftOnEnterAnimation(),
    bounceInUpOnEnterAnimation(),
    flipInXAnimation()
  ]
})
export class MainComponent implements OnInit {
  menu: MainMenu[] = [];
  menuString: string;
  title = 'Zone May';
  animationState = false;
  isStartChange = false;
  isShow: boolean;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window,
    private route: ActivatedRoute,
    private baseService: BaseService
  ) {}

  ngOnInit() {
    this.isShow = false;
    // this.baseService.getMenu()
    //   .subscribe(menu => {
    //     this.menu = menu.sort((a, b) => a.id - b.id);
    //     this.createMenu();
    //   });
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset =
      this.window.pageYOffset ||
      this.document.documentElement.scrollTop ||
      this.document.body.scrollTop ||
      0;
    if (1600 < offset && offset < 1900) {
      // console.log('Target');
      this.animate();
    }
    // console.log(offset);
  }
  animate() {
    this.animationState = false;
    setTimeout(() => {
      this.animationState = !this.animationState;
      this.isStartChange = true;
    }, 1);
  }

 drop() {
   this.isShow = true;
 }

  dropOut() {
    this.isShow = false;
  }

  createMenu(){
    console.log('1', this.menu);
    this.menuString = '';
    let i = 0;
    let k = 0;
    this.menuString += '<div class="col-3-2"><ul class="multi-column-dropdown">';
    for (const mainmenu of this.menu) {
      console.log(mainmenu);
      const currentMenuName = mainmenu.name;
      this.menuString += '<li> <div class="nav-category nav-category-bg1">' + currentMenuName + '</div></li>';
      i++;
      k++;
      console.log(k, i);
      if ((k % (12 - i)) === 0) {
        console.log('IF:', k, 12 - i, (k % (12 - i)));
        this.menuString += '</ul></div><div class="col-3-2"><ul class="multi-column-dropdown">';
        i = 0;
        k = 0;
      }
      mainmenu.submenu.forEach(sub => {
        this.menuString += '<li><a routerLink="/shop">' + sub.name + '</a></li>';
        k++;
        console.log(k, i);
        if ((k % (12 - i)) === 0) {
          console.log('IF:', k, 12 - i, (k % (12 - i)));
          this.menuString += '</ul></div><div class="col-3-2"><ul class="multi-column-dropdown">';
          i = 0;
          k = 0;
        }
      });
      console.log('MainMenu: ', mainmenu.submenu.length);

      if (mainmenu.submenu.length !== 0) {
        this.menuString += '<li class="divider"></li>';
      }
    }
    this.menuString += '</ul></div>';
    console.log(this.menuString);
  }
}
