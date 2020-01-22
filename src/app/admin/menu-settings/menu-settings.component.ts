import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { IMenu } from '../../_services/base/menu.interface';
import { ActivatedRoute } from '@angular/router';
import { MainMenu } from '../../_models/mainmenu';
import { BaseService } from '../../_services/base/base.service'
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-menu-settings',
  templateUrl: './menu-settings.component.html',
  styleUrls: ['./menu-settings.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class MenuSettingsComponent implements OnInit {
  menu: IMenu[] = [];
  selectedMenu: MainMenu;
  showInput = true;
  isOopen = 'close';
  state = 'default';
  constructor(private baseService: BaseService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.baseService.getMenu()
    .subscribe(data =>{
      this.menu = data.message.sort((a, b) => {
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
