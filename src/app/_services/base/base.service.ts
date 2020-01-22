import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { IMenu } from './menu.interface';
import { catchError, tap } from 'rxjs/operators';
import { MainMenu } from '../../_models/mainmenu';
import { Product } from '../../_models';

@Injectable()
export class BaseService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  menuUrl = environment.apiUrl + '/menu';
  addProductUrl = environment.apiUrl + '/addproduct';
  getProductUrl = environment.apiUrl + '/products';
  constructor(private http: HttpClient) {}
  getMenu() {
    return this.http.get<any>(this.menuUrl, this.httpOptions);
  }
  // return this.http.get<IMenu[]>(this.menuUrl, this.httpOptions).pipe(
  //     catchError(this.handleError<IMenu[]>('getMenu', []))
  // );

  getMenuById(id: number) {
    const url = `${this.menuUrl}/${id}`;
    return this.http.get<IMenu>(url).pipe(
      tap(_ => this.log(`fetched IMenu id=${id}`)),
      catchError(this.handleError<IMenu>(`getIMenu id=${id}`))
    );
  }

  /** PUT: update the IMenu on the server */
  updateMenu(menu: MainMenu[]): Observable<any> {
    return this.http.put(this.menuUrl, menu, this.httpOptions).pipe(
      tap(_ => this.log(`updated Menu`)),
      catchError(this.handleError<any>('updateMenu'))
    );
  }

  /** POST: add a new IMenu to the server */
  addMenu(menu: IMenu): Observable<IMenu> {
    return this.http.post<IMenu>(this.menuUrl, menu, this.httpOptions).pipe(
      tap((newMenu: IMenu) => this.log(`added IMenu w/ id=${newMenu._id}`)),
      catchError(this.handleError<IMenu>('addIMenu'))
    );
  }

  /** DELETE: delete the IMenu from the server */
  deleteMenu(menu: IMenu | number): Observable<IMenu> {
    const id = typeof menu === 'number' ? menu : menu._id;
    const url = `${this.menuUrl}/${id}`;

    return this.http.delete<IMenu>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted IMenu id=${id}`)),
      catchError(this.handleError<IMenu>('deleteIMenu'))
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
  private log(message: string) {
    console.log(`IMenuService: ${message}`);
    // this.messageService.add(`IMenuService: ${message}`);
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
