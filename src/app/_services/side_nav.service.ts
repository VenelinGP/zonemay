import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SubMenu, Product } from '../_models';

@Injectable()
export class SideNavService {
    private sb: SubMenu = {
        _id: '',
        id: 0,
        name: ''
    };
    private product: Product;
    private showHideSource = new BehaviorSubject(false);
    currentState = this.showHideSource.asObservable();
    private categorySource = new BehaviorSubject(this.sb);
    currentCategory = this.categorySource.asObservable();
    private productSource = new BehaviorSubject(this.product);
    currentProduct = this.productSource.asObservable();

    constructor() { }

    changeShowHideMenu(state: boolean) {
        this.showHideSource.next(state);
    }
    changeCategory(category: SubMenu){
        this.categorySource.next(category);
    }
    changeProduct(prod: Product){
        this.productSource.next(prod)
    }
}
