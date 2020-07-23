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
import { SideNavService } from '../_services/side_nav.service';
import { SubMenu } from '../_models';
import { amazoneUrl } from '../_constants/constants';

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
  categoryList: any[] = [];
  menuString: string;
  title = 'Zone May';
  animationState = false;
  isStartChange = false;
  isShow: boolean;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window,
    private route: ActivatedRoute,
    private baseService: BaseService,
    private sideNavService: SideNavService ) {}

  ngOnInit() {
    this.isShow = false;
    this.baseService.getMenu()
      .subscribe(menu => {
        this.menu = menu.sort((a, b) => a.id - b.id);
        this.menu.forEach(m => {
          m.submenu.forEach(s => {
            s.imglink = amazoneUrl + s.imglink;
          });
        });
        console.log(menu);
        this.createCategory();
      });
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
  goToShop(categoriId: SubMenu) {
    this.sideNavService.changeCategory(categoriId);
  }

  changeCategory() {
    this.sideNavService.changeCategory({ _id: '', id: 0, name: 'Всички продукти', imglink: '', imgBig: '' });
  }

  createCategory(): any {
    for (let i = 0; i < this.menu.length - 2; i++) {
      this.categoryList.push(this.menu[i]);
    }
    console.log(this.categoryList);
  }
}
