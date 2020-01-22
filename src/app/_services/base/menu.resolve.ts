import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { IMenu } from './menu.interface';

@Injectable()
export class MenuResolve implements Resolve<IMenu[]> {
    constructor(private baseService: BaseService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<IMenu[]> {
        return this.baseService.getMenu();
    }
}
