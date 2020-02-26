import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SubMenu } from '../_models';

@Injectable()
export class SideNavService {
    private sb: SubMenu = {
        _id: '',
        id: 0,
        name: ''
    };
    private showHideSource = new BehaviorSubject(false);
    private categorySource = new BehaviorSubject(this.sb);
    currentState = this.showHideSource.asObservable();
    currentCategory = this.categorySource.asObservable();

    constructor() { }

    changeShowHideMenu(state: boolean) {
        this.showHideSource.next(state);
    }
    changeCategory(category: SubMenu){
        this.categorySource.next(category);
    }
}
