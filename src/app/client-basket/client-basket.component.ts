import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from '../_services/base.service';
import { Client } from '../_models';

@Component({
  selector: 'app-client-basket',
  templateUrl: './client-basket.component.html',
  styleUrls: ['./client-basket.component.scss']
})
export class ClientBasketComponent implements OnInit {
  client: Client;
  constructor(private route: ActivatedRoute, private baseService: BaseService) { }

  ngOnInit() {
    this.getClient();
  }

  getClient() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(Number(id));
    this.baseService.getClientsBasket()
      .subscribe(requests => {
        this.client = requests.find(r => r._id === id);
        console.log(this.client);
      });
  }
}
