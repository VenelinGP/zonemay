import { Component, OnInit } from '@angular/core';
import { MainMenu, Product } from '../_models';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from '../_services/basket.service';
import { BaseService } from '../_services/base.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  sumOfBasket = 0;
  sumOfDiscount = 0;
  total = 0;
  currierPrice = 3;
  basket: Product[];
  constructor( private basketService: BasketService) { }

  ngOnInit() {
    this.basketService.currentbasket.subscribe(basket => {
      if (basket.length !== 0) {
        this.basket = basket;
        this.update();
      }
    });
  }

  update() {
    this.sumOfBasket = 0;
    this.sumOfDiscount = 0;
    this.total = 0;
    this.basket.forEach(p => {
      this.sumOfBasket += p.price * p.buyingQty;
      if (p.discount > 0) {
        this.sumOfDiscount += (p.price - p.discount) * p.buyingQty;
      }
    });
    this.total = this.sumOfBasket - this.sumOfDiscount + this.currierPrice;
  }


  onKey() {
    this.update();
    console.log('click');
    this.basketService.changeBasket(this.basket);
  }
  remove(id) {
    console.log(id);
    const index = this.basket.map(x => {
      return x._id;
    }).indexOf(id);
    console.log(index);
    if (index > -1){
      this.basket.splice(index, 1);
    }
    this.update();
    console.log('Cart', this.basket);
    this.basketService.changeBasket(this.basket);
  }
}
