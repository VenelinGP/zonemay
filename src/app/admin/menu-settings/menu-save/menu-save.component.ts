import { Component, OnInit, Input } from '@angular/core';
import { MainMenu } from '../../../_models/mainmenu';
import { BaseService } from '../../../_services/base.service';
import { AlertService, AlertTime } from '../../../_alert';
import { SideNavService } from '../../../_services/side_nav.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { amazoneUrl } from '../../../_constants/constants';

@Component({
  selector: 'app-menu-save',
  templateUrl: './menu-save.component.html',
  styleUrls: ['./menu-save.component.scss']
})
export class MenuSaveComponent implements OnInit {
  @Input() menu: MainMenu[];
  addedSubMenu: any[] = [];
  currentFileUpload: File;
  progress: { percentage: number; } = { percentage: 0 };
  constructor(
    private baseService: BaseService,
    private sideNaveService: SideNavService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.sideNaveService.currentaddedSubmenu.subscribe(submenu => {
      // submenu.forEach(s => {
      //   this.addedSubMenu.push(s);
      // });
      // this.addedSubMenu = submenu;
      console.log(submenu);
    });
  }
  save() {
    console.log('Save: ', this.menu);
    this.sideNaveService.currentaddedSubmenu.subscribe(submenu => {
      submenu.forEach(s => {
        this.addedSubMenu.push(s);
      });
      console.log(this.addedSubMenu);
    });
    this.addedSubMenu.forEach(el => {
      if (el.imglink !== undefined && el.imglink !== '') {
        this.uploadAttachmentToServer(el);
      } else {
        this.saveMenu(el);
      }
    });
  }


  uploadAttachmentToServer(pics) {
    this.currentFileUpload = new File([pics.imglink], 'submenu.jpg');
    this.baseService
      .pushMenuFileToStorage(this.currentFileUpload)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(
            (100 * event.loaded) / event.total
          );
        } else if (event instanceof HttpResponse) {
          console.log('Picture is completely uploaded!');
          const jsObj = JSON.parse(event.body.toString());
          const success: boolean = jsObj.success;
          if (success) {
            const filename = jsObj.filename;
            console.log(pics._id, pics.id, filename);
            const i = this.menu.findIndex((e) => e._id === pics._id);
            this.menu[i].submenu.map(s => s.imglink = s.imglink.replace(amazoneUrl, ''));
            const j = this.menu[i].submenu.findIndex((e) => e.id === pics.id );
            this.menu[i].submenu[j].imglink = filename;
            console.log(this.menu);
            this.baseService.updateMenu(this.menu[i]).subscribe(mes => {
                console.log(mes);
                if (mes.successful === 'Saved') {
                    this.successMess(mes.successful);
                  } else {
                    this.errorMess(mes.succesful);
                  }
                });
          }
        }
      });
  }
  saveMenu(item){
    console.log(item);
    const i = this.menu.findIndex((e) => e._id === item._id);
    this.baseService.updateMenu(this.menu[i]).subscribe(mes => {
      console.log(mes);
      if (mes.successful === 'Saved') {
        this.successMess(mes.successful);
      } else {
        this.errorMess(mes.succesful);
      }
    });
  }
  errorMess(message: string) {
    this.alertService.error(message);
    setTimeout(() => {
      this.alertService.clear();
    }, AlertTime.Long);
  }

  successMess(message: string) {
    this.alertService.success(message);
    setTimeout(() => {
      this.alertService.clear();
    }, AlertTime.Long);
  }
}
