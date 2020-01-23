import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { MainMenu } from '../../_models/mainmenu';
import { BaseService } from '../../_services/base.service';


@Component({
  selector: 'app-menu-settings',
  templateUrl: './menu-settings.component.html',
  styleUrls: ['./menu-settings.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class MenuSettingsComponent implements OnInit {
  menu: MainMenu[] = [];
  selectedMenu: MainMenu;
  showInput = true;
  isOopen = 'close';
  state = 'default';
  constructor(private baseService: BaseService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.baseService.getMenu()
    .subscribe(menu => {
      this.menu = menu.sort((a, b) => {
        return a.id - b.id;
      });
    });
    console.log(this.menu);
  }
  onSelect(mainMenu: MainMenu): void {
    this.selectedMenu = mainMenu;
    console.log(this.selectedMenu);
  }
}
