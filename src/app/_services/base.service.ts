import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MainMenu } from '../_models/mainmenu';
import { Product, Client } from '../_models';

@Injectable()
export class BaseService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  menuUrl = environment.apiUrl + '/menu';
  getMenuUrl = environment.apiUrl + '/menu';
  addProductUrl = environment.apiUrl + '/addproduct';
  getProductUrl = environment.apiUrl + '/products';
  clientBasketUrl = environment.apiUrl + '/client';
  mainMenu: MainMenu[] = [];
  constructor(private http: HttpClient) {}

  getMenu(): Observable<MainMenu[]> {
    console.log('menu: ', this.getMenuUrl);
    return this.http.get<MainMenu[]>(this.getMenuUrl).pipe(
      tap(_ => this.log('Fetched menu')),
      catchError(this.handleError<MainMenu[]>('getMenu', []))
    );
  }
  getMenuNotObservable(): MainMenu[] {
    console.log('BS: ', this.mainMenu.length);
    if (this.mainMenu.length === 0) {
      console.log('Get Menu 11111');
      this.getMenu().subscribe(menu => {
        this.mainMenu = menu.sort((a, b) => a.id - b.id);
      });
      return this.mainMenu;
    } else {
      console.log('Get Menu 22222');
      return this.mainMenu;
    }
  }
  getMenuById(id: number) {
    const url = `${this.menuUrl}/${id}`;
    return this.http.get<MainMenu>(url).pipe(
      tap(_ => this.log(`fetched MainMenu id=${id}`)),
      catchError(this.handleError<MainMenu>(`getMainMenu id=${id}`))
    );
  }

  /** PUT: update the MainMenu on the server */
  updateMenu(menu: MainMenu): Observable<any> {
    // console.log('menu: ', menu);
    return this.http.put(this.menuUrl, menu, this.httpOptions).pipe(
      tap(_ => this.log(`updated Menu`)),
      catchError(this.handleError<any>('updateMenu'))
    );
  }

  /** POST: add a new MainMenu to the server */
  addMenu(menu: MainMenu): Observable<MainMenu> {
    return this.http.post<MainMenu>(this.menuUrl, menu, this.httpOptions).pipe(
      tap((newMenu: MainMenu) => this.log(`added MainMenu w/ id=${newMenu._id}`)),
      catchError(this.handleError<MainMenu>('addMainMenu'))
    );
  }

  /** DELETE: delete the MainMenu from the server */
  deleteMenu(menu: MainMenu | number): Observable<MainMenu> {
    const id = typeof menu === 'number' ? menu : menu._id;
    const url = `${this.menuUrl}/${id}`;

    return this.http.delete<MainMenu>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted MainMenu id=${id}`)),
      catchError(this.handleError<MainMenu>('deleteMainMenu'))
    );
  }

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    formdata.append('picture', file, file.name);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
    };
    const req = new HttpRequest(
      'POST',
      environment.apiUrl + '/upload',
      formdata,
      {
        reportProgress: true,
        responseType: 'text'
      }
    );

    return this.http.request(req);
  }
  pushMenuFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    formdata.append('submenu', file, file.name);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
    };
    const req = new HttpRequest(
      'POST',
      environment.apiUrl + '/uploadsubmenu',
      formdata,
      {
        reportProgress: true,
        responseType: 'text'
      }
    );

    return this.http.request(req);
  }
  addProduct(product: any): Observable<any> {
    return this.http.post<any>(this.addProductUrl, product, this.httpOptions).pipe(
      tap((newProduct: any) =>
        this.log(`added Product w/ id=${newProduct._id}`)
      ),
      catchError(this.handleError<any>('addProduct'))
    );
  }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.getProductUrl).pipe(
      tap(_ => this.log('fetched products')),
      catchError(this.handleError<Product[]>('getProducts', []))
    );
  }

  addClientBasket(client: any): Observable<any> {
    return this.http.post<any>(this.clientBasketUrl, client, this.httpOptions).pipe(
      tap((newClient: any) =>
        this.log(`added Client w/ id=${newClient}`)
      ),
      catchError(this.handleError<any>('addClientBasket'))
    );
  }

  getClientsBasket(): Observable<Client[]>{
    return this.http.get<Client[]>(this.clientBasketUrl).pipe(
      tap(_ => this.log('fetched clients requests')),
      catchError(this.handleError<Client[]>('getRequests', []))
    );
  }
  private log(message: string) {
    console.log(`MainMenuService: ${message}`);
    // this.messageService.add(`MainMenuService: ${message}`);
  }

  // Handle Http operation that failed.
  // Let the app continue.
  // @param operation - name of the operation that failed
  // @param result - optional value to return as the observable result
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
