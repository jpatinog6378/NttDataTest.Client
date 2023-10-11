import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of, retry } from "rxjs";
import { map } from 'rxjs/operators';
import { environment } from "src/environments/environments";
import { AuthorServicesModel } from "../models/authors";
import { AddOrUpdateBookService, BookServiceModel } from "../models/books";

@Injectable({
  providedIn: 'root',
})

export class LibraryService {
    urlApi = environment.urlApi;
    headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    constructor(private http: HttpClient) { }

    getAuthorsAll() : Observable<AuthorServicesModel[]> {
        const endPointUrl = this.urlApi + environment.authorGetAll;
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get<AuthorServicesModel[]>(endPointUrl, { headers, observe: 'response' })
          .pipe(
            map(response => response.body ? response.body : [])
          );
      };
    
    addOrUpdateAuthor(model : AuthorServicesModel) : Observable<AuthorServicesModel[]> {
        const endPointUrl = this.urlApi + environment.authorAddOrUpdate ;
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post<AuthorServicesModel[]>(endPointUrl, model,  { headers })
          .pipe(
            map(response => response ? response : [])
          );
    };

    deleteAuthor(id : any): Observable<AuthorServicesModel[]> {
        const endPointUrl = `${this.urlApi}${environment.deleteAuthor}`;
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const params = new HttpParams().set('id', id);
        return this.http.delete<AuthorServicesModel[]>(endPointUrl,  { headers , params })
          .pipe(
            map(response => response ? response : [])
          );
    };

    getBooksAll() : Observable<BookServiceModel[]> {
        const endPointUrl = this.urlApi + environment.bookGetAll;
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get<BookServiceModel[]>(endPointUrl, { headers, observe: 'response' })
          .pipe(
            map(response => response.body ? response.body : [])
          );
    };

    addOrUpdateBook(model : AddOrUpdateBookService) : Observable<BookServiceModel[]> {
        const endPointUrl = this.urlApi + environment.bookAddOrUpdate ;
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post<BookServiceModel[]>(endPointUrl, model,  { headers })
          .pipe(
            map(response => response ? response : [])
          );
    };

    deleteBook(id : any): Observable<BookServiceModel[]> {
        const endPointUrl = `${this.urlApi}${environment.deleteBook}`;
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const params = new HttpParams().set('id', id);
        return this.http.delete<BookServiceModel[]>(endPointUrl,  { headers , params })
          .pipe(
            map(response => response ? response : [])
          );
    };
    
}