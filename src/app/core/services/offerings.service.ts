import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import {  Offering } from '../models';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class OfferingService {

  
  private offeringUrl = 'http://localhost:3000/offerings';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }



    /** GET offerings from the server */
    getOfferings(): Observable<Offering[]> {
        return this.http.get<Offering[]>(this.offeringUrl)
          .pipe(
            tap(_ => this.log('fetched offering')),
            catchError(this.handleError<Offering[]>('getOffering', []))
          );
      }

  /** GET offering by id. Return `undefined` when id not found */
  getOfferingNo404<Data>(id: number): Observable<Offering> {
    const url = `${this.offeringUrl}/?id=${id}`;
    return this.http.get<Offering[]>(url)
      .pipe(
        map(offerings => offerings[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} offering id=${id}`);
        }),
        catchError(this.handleError<Offering>(`getOffering id=${id}`))
      );
  }

  /** GET offering by id. Will 404 if id not found */
  getOffering(id: number): Observable<Offering> {
    const url = `${this.offeringUrl}/${id}`;
    return this.http.get<Offering>(url).pipe(
      tap(_ => this.log(`fetched offering id=${id}`)),
      catchError(this.handleError<Offering>(`getOffering id=${id}`))
    );
  }

  /* GET offerings whose name contains search term */
  searchOfferings(term: string): Observable<Offering[]> {
    console.log(term);
    if (!term.trim()) {
      // if not search term, return empty offering array.
      return of([]);
    }
    return this.http.get<Offering[]>(`${this.offeringUrl}/?q=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found offerings matching "${term}"`) :
         this.log(`no offerings matching "${term}"`)),
      catchError(this.handleError<Offering[]>('searchOfferings', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new offering to the server */
  addOffering(offering: Offering): Observable<Offering> {
    return this.http.post<Offering>(this.offeringUrl, offering, this.httpOptions).pipe(
      tap((newOffering: Offering) => this.log(`added offering w/ id=${newOffering.id}`)),
      catchError(this.handleError<Offering>('addOffering'))
    );
  }

  /** DELETE: delete the offering from the server */
  deleteOffering(id: number): Observable<Offering> {
    const url = `${this.offeringUrl}/${id}`;

    return this.http.delete<Offering>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted offering id=${id}`)),
      catchError(this.handleError<Offering>('deleteOffering'))
    );
  }

  /** PUT: update the offering on the server */
  updateOffering(offering: Offering): Observable<any> {
    const url = `${this.offeringUrl}/${offering.id}`;
      console.log(offering);
      console.log(this.httpOptions);
    return this.http.put(url, offering, this.httpOptions).pipe(
      tap(_ => this.log(`updated offering id=${offering.id}`)),
      catchError(this.handleError<any>('updateOffering'))
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

  /** Log a OfferingService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`OfferingService: ${message}`);
  }
}