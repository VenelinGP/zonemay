import { Component, OnInit } from '@angular/core';
import { SideNavService } from '../_services/side_nav.service';
import { Product } from '../_models';
import { BasketService } from '../_services/basket.service';
import { BaseService } from '../_services/base.service';
import { amazoneUrl } from '../_constants/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss']
})
export class ShopItemComponent implements OnInit {
  product: Product;

  sumOfBasket = 0;
  sumOfDiscount = 0;
  total = 0;
  currierPrice = 3;
  basket: Product[] = [];
  similarProducts: Product[];
  constructor(
    private sideNavService: SideNavService,
    private basketService: BasketService,
    private baseService: BaseService,
    private router: Router
    ) { }

  ngOnInit() {
    this.similarProducts = [];
    this.sideNavService.currentProduct.subscribe(p => {
      this.product = p;
      console.log(this.product);
      this.product.buyingQty = 1;
      this.baseService.getProducts()
        .subscribe(products => {
          products.map(p => p.imglink = amazoneUrl + p.imglink);
          products.forEach(pr => {
            if (pr.category === this.product.category && pr._id !== this.product._id) {
              this.similarProducts.push(pr);
            }
          });
          if (this.similarProducts.length > 4) {
            let len = this.similarProducts.length;
            for (let i = 0; i <= this.similarProducts.length - 4; i++) {
              const index = Math.floor(Math.random() * len);
              this.similarProducts.splice(index, 1);
              len = this.similarProducts.length;
              console.log(index);
            }
            console.log(this.similarProducts);
          }
        });
    });
    this.basketService.currentBasket.subscribe(basket => {
      this.basket = basket;
      this.update();
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
    if (this.product.buyingQty > this.product.quantity) {
      this.product.buyingQty = this.product.quantity;
    }

  }
  remove()  {
    if (this.product.buyingQty > 1) {
      this.product.buyingQty--;
    }
    this.onKey();
  }
  add() {
    this.product.buyingQty++;
    this.onKey();
  }
  buy() {
      this.basket.push(this.product);
      this.basketService.changeBasket(this.basket);
  }

  seeDetails(id, i) {
    const pr = this.similarProducts.filter(p => p._id === id)[0];
    this.sideNavService.changeProduct(pr);
    this.similarProducts = [];
    this.router.navigate(['/shop', i]);
  }
}
