import { Component, OnInit } from '@angular/core';
import { SideNavService } from '../_services/side_nav.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private sideNavService: SideNavService) { }

  ngOnInit() {
  }

  changeCategory() {
    this.sideNavService.changeCategory({ _id: '', id: 0, name: 'Всички продукти', imglink: '', imgBig: '' });
  }
}
