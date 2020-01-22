import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { MainMenu } from '../../../_models/mainmenu';
import { SubMenu } from '../../../_models/submenu';


@Component({
  selector: 'app-menu-detail',
  templateUrl: './menu-detail.component.html',
  styleUrls: ['./menu-detail.component.scss']
})
export class MenuDetailComponent implements OnInit {
  @Input() selectedMenu: MainMenu;
  constructor() {}

  ngOnInit() {
  }
  save(id) {
    console.log(this.selectedMenu);
  }
  goBack(): void {
    this.selectedMenu = undefined;
  }

  delete(submenuId: number) {
    const index = this.selectedMenu.submenu.findIndex(el => el.id === submenuId);
    this.selectedMenu.submenu.splice(index, 1);
    console.log(this.selectedMenu);
  }
  add(name: string) {

    // tslint:disable-next-line: variable-name
    const _id = '0';
    name = name.trim();
    if (!name) {
      return;
    }
    let id = 0;
    if ( this.selectedMenu.submenu.length === 0 ) {
      id = 1;
    } else {
      id = this.selectedMenu.submenu[this.selectedMenu.submenu.length - 1].id + 1;
    }

    const newSubmenuElelemnt: SubMenu = {
      _id,
      id,
      name
    };
    this.selectedMenu.submenu.push(newSubmenuElelemnt);
  }
}
