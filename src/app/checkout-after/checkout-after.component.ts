import { Component, OnInit } from '@angular/core';
import { Client } from '../_models';
import { BasketService } from '../_services/basket.service';

@Component({
  selector: 'app-checkout-after',
  templateUrl: './checkout-after.component.html',
  styleUrls: ['./checkout-after.component.scss']
})
export class CheckoutAfterComponent implements OnInit {
  currentClient: Client;
  currentBasket = [];
  sumOfBasket = 0;
  sumOfDiscount = 0;
  total = 0;
  currierPrice = 3;
  constructor(private basketService: BasketService) { }

  ngOnInit() {
    this.basketService.currentClient.subscribe(client => this.currentClient = client);
    this.basketService.currentBasket.subscribe(basket => {
      this.currentBasket = basket;
      this.calculate();
    });
  }
  calculate() {
    this.sumOfBasket = 0;
    this.sumOfDiscount = 0;
    this.total = 0;
    this.currentBasket.forEach(p => {
      this.sumOfBasket += p.price * p.buyingQty;
      if (p.discount > 0) {
        this.sumOfDiscount += (p.price - p.discount) * p.buyingQty;
      }
    });
    this.total = this.sumOfBasket - this.sumOfDiscount + this.currierPrice;
  }
}
