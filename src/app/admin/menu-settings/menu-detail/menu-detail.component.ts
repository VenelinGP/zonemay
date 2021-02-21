import { Component, OnInit, Input } from '@angular/core';
import { MainMenu } from '../../../_models/mainmenu';
import { SubMenu } from '../../../_models/submenu';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { BaseService } from '../../../_services/base.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { SideNavService } from '../../../_services/side_nav.service';
import { amazoneUrl } from '../../../_constants/constants';


@Component({
  selector: 'app-menu-detail',
  templateUrl: './menu-detail.component.html',
  styleUrls: ['./menu-detail.component.scss']
})
export class MenuDetailComponent implements OnInit {
  subMenu = '';
  addedSubmenu = [];
  menu: any;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  showAddingSubMenu: boolean;
  showDetailedSubMenu: boolean;
  isDisabled: boolean;
  @Input() selectedMenu: MainMenu;
  constructor(
    private baseService: BaseService,
    private sideNavService: SideNavService
    ) {}

  ngOnInit() {
    this.showAddingSubMenu = true;
    this.showDetailedSubMenu = false;
    this.isDisabled = true;
    this.selectedMenu.submenu.map(s =>  s.imglink = amazoneUrl + s.imglink);
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
    this.addedSubmenu.push({ _id: this.selectedMenu._id, id: submenuId, imglink: undefined });
    this.sideNavService.changeSubMenu(this.addedSubmenu);
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
    const imglink = this.dataURItoBlob(this.croppedImage);
    this.addedSubmenu.push({_id: this.selectedMenu._id, id, imglink});
    this.sideNavService.changeSubMenu(this.addedSubmenu);

    const reader = new FileReader();
    let base64String: any;
    reader.readAsDataURL(imglink);
    reader.onloadend = () => {
      base64String = reader.result;
      const newSubmenuElement: SubMenu = {
        id,
        name,
        imglink: base64String,
        imgBig: ''
      };
      this.selectedMenu.submenu.push(newSubmenuElement);
      this.showAddingSubMenu = false;
      this.croppedImage = '';
    };
    console.log(this.addedSubmenu);
  }
  onKey(event: any) {
    // without type info
    if (this.subMenu !== null || this.subMenu === '') {
      this.isDisabled = false;
    }
    this.subMenu = event.target.value;
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
    next() {
    if (typeof this.subMenu === 'string') {
      this.showAddingSubMenu = true;
    }
  }
  back() {
    this.showAddingSubMenu = false;
  }
  editSubMenu() {
    this.showAddingSubMenu = false;
    this.showDetailedSubMenu = true;
  }
  dataURItoBlob(dataURI): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI
      .split(',')[0]
      .split(':')[1]
      .split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }
}
