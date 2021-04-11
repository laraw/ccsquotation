import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Child } from '../models';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class ChildService {

  private childrenUrl = 'http://localhost:3000/children';  // URL to web api
  


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET children from the server */
  getChildren(): Observable<Child[]> {
    return this.http.get<Child[]>(this.childrenUrl)
      .pipe(
        tap(_ => this.log('fetched children')),
        catchError(this.handleError<Child[]>('getChildren', []))
      );
  }



  /** GET child by id. Return `undefined` when id not found */
  getChildNo404<Data>(id: number): Observable<Child> {
    const url = `${this.childrenUrl}/?id=${id}`;
    return this.http.get<Child[]>(url)
      .pipe(
        map(children => children[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} child id=${id}`);
        }),
        catchError(this.handleError<Child>(`getChild id=${id}`))
      );
  }

  /** GET child by id. Will 404 if id not found */
  getChild(id: number): Observable<Child> {
    const url = `${this.childrenUrl}/${id}`;
    return this.http.get<Child>(url).pipe(
      tap(_ => this.log(`fetched child id=${id}`)),
      catchError(this.handleError<Child>(`getChild id=${id}`))
    );
  }

  /* GET children whose name contains search term */
  searchChildren(term: string): Observable<Child[]> {
    console.log(term);
    if (!term.trim()) {
      // if not search term, return empty child array.
      return of([]);
    }
    return this.http.get<Child[]>(`${this.childrenUrl}/?q=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found children matching "${term}"`) :
         this.log(`no children matching "${term}"`)),
      catchError(this.handleError<Child[]>('searchChildren', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new child to the server */
  addChild(child: Child): Observable<Child> {
    return this.http.post<Child>(this.childrenUrl, child, this.httpOptions).pipe(
      tap((newChild: Child) => this.log(`added child w/ id=${newChild.id}`)),
      catchError(this.handleError<Child>('addChild'))
    );
  }

  /** DELETE: delete the child from the server */
  deleteChild(id: number): Observable<Child> {
    const url = `${this.childrenUrl}/${id}`;

    return this.http.delete<Child>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted child id=${id}`)),
      catchError(this.handleError<Child>('deleteChild'))
    );
  }

  /** PUT: update the child on the server */
  updateChild(child: Child): Observable<any> {
    const url = `${this.childrenUrl}/${child.id}`;
      console.log(child);
      console.log(this.httpOptions);
    return this.http.put(url, child, this.httpOptions).pipe(
      tap(_ => this.log(`updated child id=${child.id}`)),
      catchError(this.handleError<any>('updateChild'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
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

  /** Log a ChildService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ChildService: ${message}`);
  }
}