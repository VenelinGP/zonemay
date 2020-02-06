import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../_services/base.service';
import { Client } from '../../_models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  currentClient: Client;
  requests: Client[];
  constructor(private baseService: BaseService, private router: Router) { }

  ngOnInit() {
    this.baseService.getClientsBasket()
      .subscribe(requests => {
        this.requests = requests;
        console.log(this.requests);
      });
  }
}
