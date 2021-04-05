import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Centre, Offering } from '../models';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class CentreService {

  private centresUrl = 'http://localhost:3000/centres';  // URL to web api
  
  private offeringUrl = 'http://localhost:3000/offerings';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET centres from the server */
  getCentres(): Observable<Centre[]> {
    return this.http.get<Centre[]>(this.centresUrl)
      .pipe(
        tap(_ => this.log('fetched centres')),
        catchError(this.handleError<Centre[]>('getCentres', []))
      );
  }

    /** GET centres from the server */
    getOfferings(): Observable<Offering[]> {
        return this.http.get<Offering[]>(this.offeringUrl)
          .pipe(
            tap(_ => this.log('fetched offering')),
            catchError(this.handleError<Offering[]>('getOffering', []))
          );
      }

  /** GET centre by id. Return `undefined` when id not found */
  getCentreNo404<Data>(id: number): Observable<Centre> {
    const url = `${this.centresUrl}/?id=${id}`;
    return this.http.get<Centre[]>(url)
      .pipe(
        map(centres => centres[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} centre id=${id}`);
        }),
        catchError(this.handleError<Centre>(`getCentre id=${id}`))
      );
  }

  /** GET centre by id. Will 404 if id not found */
  getCentre(id: number): Observable<Centre> {
    const url = `${this.centresUrl}/${id}`;
    return this.http.get<Centre>(url).pipe(
      tap(_ => this.log(`fetched centre id=${id}`)),
      catchError(this.handleError<Centre>(`getCentre id=${id}`))
    );
  }

  /* GET centres whose name contains search term */
  searchCentres(term: string): Observable<Centre[]> {
    console.log(term);
    if (!term.trim()) {
      // if not search term, return empty centre array.
      return of([]);
    }
    return this.http.get<Centre[]>(`${this.centresUrl}/?q=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found centres matching "${term}"`) :
         this.log(`no centres matching "${term}"`)),
      catchError(this.handleError<Centre[]>('searchCentres', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new centre to the server */
  addCentre(centre: Centre): Observable<Centre> {
    return this.http.post<Centre>(this.centresUrl, centre, this.httpOptions).pipe(
      tap((newCentre: Centre) => this.log(`added centre w/ id=${newCentre.id}`)),
      catchError(this.handleError<Centre>('addCentre'))
    );
  }

  /** DELETE: delete the centre from the server */
  deleteCentre(id: number): Observable<Centre> {
    const url = `${this.centresUrl}/${id}`;

    return this.http.delete<Centre>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted centre id=${id}`)),
      catchError(this.handleError<Centre>('deleteCentre'))
    );
  }

  /** PUT: update the centre on the server */
  updateCentre(centre: Centre): Observable<any> {
    const url = `${this.centresUrl}/${centre.id}`;
      console.log(centre);
      console.log(this.httpOptions);
    return this.http.put(url, centre, this.httpOptions).pipe(
      tap(_ => this.log(`updated centre id=${centre.id}`)),
      catchError(this.handleError<any>('updateCentre'))
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

  /** Log a CentreService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`CentreService: ${message}`);
  }
}