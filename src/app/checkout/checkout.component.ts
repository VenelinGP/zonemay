import { Component, OnInit } from '@angular/core';
import { BasketService } from '../_services/basket.service';
import { Product, Client, BuyingProduct } from '../_models';
import { BaseService } from '../_services/base.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  sumOfBasket = 0;
  sumOfDiscount = 0;
  total = 0;
  currierPrice = 3;
  basket: Product[];

  client: Client;
  deliveryAddress = false;
  isApproved = false;

  registerForm!: FormGroup
  submitted = false;
  posts: any;
  constructor(private baseService: BaseService, private basketService: BasketService, private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstname: ['', [Validators.required, Validators.minLength(6)]],
      mobile: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(10)]]
  });
    this.client = {
      name: '',
      family: '',
      email: '',
      phone: '',
      address: '',
      address2: '',
      city: '',
      postCode: '',
      accepted: false,
      approved: false,
      fulfilled: false,
      arhived: false,
      deleted: false
    };

    this.basketService.currentBasket.subscribe(basket => {
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
  submit() {
    const currentbasket: BuyingProduct[] = [];
    let product: BuyingProduct = {
      productId: 0,
      name: '',
      price: 0,
      discount: 0,
      buyingQty: 0
    };
    this.basket.forEach(p => {
      product = {
        productId: p._id,
        name: p.name,
        price: p.price,
        discount: p.discount,
        buyingQty: p.buyingQty
      };
      currentbasket.push(product);
    });
    this.client.basket = currentbasket;
    this.basketService.changeClient(this.client);
    console.log(this.client);
    this.baseService.addClientBasket(this.client)
      .subscribe(data => {
        console.log(data);
    });
  }
  registerAccount(checked) {
    console.log(checked);
  }
  eventCheck(checked) {
      this.deliveryAddress = checked;
  }
  approval(checked) {
    this.isApproved = checked;
  }
}
