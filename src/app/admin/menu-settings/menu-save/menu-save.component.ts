import { Component, OnInit, Input } from '@angular/core';
import { MainMenu } from '../../../_models/mainmenu';
import { BaseService } from '../../../_services/base/base.service';
import { AlertService, AlertTime } from '../../../_alert';

@Component({
  selector: 'app-menu-save',
  templateUrl: './menu-save.component.html',
  styleUrls: ['./menu-save.component.scss']
})
export class MenuSaveComponent implements OnInit {
  @Input() menu: MainMenu[];
  constructor(private baseService: BaseService, private alertService: AlertService) { }

  ngOnInit() {
  }
  save() {
      console.log(this.menu);
      this.baseService.updateMenu(this.menu).subscribe(mes => {
        console.log(mes);
        if (mes.successful === 'Saved'){
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
