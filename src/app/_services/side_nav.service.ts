import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SubMenu } from '../_models';

@Injectable()
export class SideNavService {
    private sb: SubMenu = {
        _id: '5e1b906d1608b66bc0e2f401',
        id: 1,
        name: 'Кукли'
    };
    private toggleSource = new BehaviorSubject(false);
    private categorySource = new BehaviorSubject(this.sb);
    currentState = this.toggleSource.asObservable();
    currentCategory = this.categorySource.asObservable();

    constructor() { }

    changeState(state: boolean) {
        this.toggleSource.next(state);
    }
    changeCategory(category: SubMenu){
        this.categorySource.next(category);
    }
}
