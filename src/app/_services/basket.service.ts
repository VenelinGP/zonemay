import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../_models';

@Injectable()
export class BasketService {

    private basketSource = new BehaviorSubject([]);
    currentbasket = this.basketSource.asObservable();

    constructor() { }

    changeBasket(basket: Product[]) {
        console.log(basket);
        this.basketSource.next(basket);
    }
}
