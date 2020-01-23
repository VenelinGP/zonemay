import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../_models';

@Injectable()
export class BasketService {

    private basketSource = new BehaviorSubject([]);
    currentbasket = this.basketSource.asObservable();

    constructor() { }

    changeBasket(basket: Product[]) {
        this.basketSource.next(basket);
    }
}
