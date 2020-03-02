import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product, Client } from '../_models';

@Injectable()
export class BasketService {

    client: Client = {
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

    private basketSource = new BehaviorSubject([]);
    private clientSource = new BehaviorSubject(this.client);
    currentBasket = this.basketSource.asObservable();
    currentClient = this.clientSource.asObservable();

    constructor() { }

    changeBasket(basket: Product[]) {
        console.log(basket);
        this.basketSource.next(basket);
    }
    changeClient(client: Client){
        this.clientSource.next(client);
    }
}
