import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Enquiry, Offering } from '../models';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class EnquiryService {

  private enquiriesUrl = 'http://localhost:3000/enquiries';  // URL to web api
  
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET enquiries from the server */
  getEnquiries(): Observable<Enquiry[]> {
    return this.http.get<Enquiry[]>(this.enquiriesUrl)
      .pipe(
        tap(_ => this.log('fetched enquiries')),
        catchError(this.handleError<Enquiry[]>('getEnquiries', []))
      );
  }


  /** GET enquiry by id. Return `undefined` when id not found */
  getEnquiryNo404<Data>(id: number): Observable<Enquiry> {
    const url = `${this.enquiriesUrl}/?id=${id}`;
    return this.http.get<Enquiry[]>(url)
      .pipe(
        map(enquiries => enquiries[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} enquiry id=${id}`);
        }),
        catchError(this.handleError<Enquiry>(`getEnquiry id=${id}`))
      );
  }

  /** GET enquiry by id. Will 404 if id not found */
  getEnquiry(id: number): Observable<Enquiry> {
    const url = `${this.enquiriesUrl}/${id}`;
    return this.http.get<Enquiry>(url).pipe(
      tap(_ => this.log(`fetched enquiry id=${id}`)),
      catchError(this.handleError<Enquiry>(`getEnquiry id=${id}`))
    );
  }

  /* GET enquiries whose name contains search term */
  searchEnquiries(term: string): Observable<Enquiry[]> {
    console.log(term);
    if (!term.trim()) {
      // if not search term, return empty enquiry array.
      return of([]);
    }
    return this.http.get<Enquiry[]>(`${this.enquiriesUrl}/?q=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found enquiries matching "${term}"`) :
         this.log(`no enquiries matching "${term}"`)),
      catchError(this.handleError<Enquiry[]>('searchEnquiries', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new enquiry to the server */
  addEnquiry(enquiry: Enquiry): Observable<Enquiry> {
    return this.http.post<Enquiry>(this.enquiriesUrl, enquiry, this.httpOptions).pipe(
      tap((newEnquiry: Enquiry) => this.log(`added enquiry w/ id=${newEnquiry.id}`)),
      catchError(this.handleError<Enquiry>('addEnquiry'))
    );
  }

  /** DELETE: delete the enquiry from the server */
  deleteEnquiry(id: number): Observable<Enquiry> {
    const url = `${this.enquiriesUrl}/${id}`;

    return this.http.delete<Enquiry>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted enquiry id=${id}`)),
      catchError(this.handleError<Enquiry>('deleteEnquiry'))
    );
  }

  /** PUT: update the enquiry on the server */
  updateEnquiry(enquiry: Enquiry): Observable<any> {
    const url = `${this.enquiriesUrl}/${enquiry.id}`;
      console.log(enquiry);
      console.log(this.httpOptions);
    return this.http.put(url, enquiry, this.httpOptions).pipe(
      tap(_ => this.log(`updated enquiry id=${enquiry.id}`)),
      catchError(this.handleError<any>('updateEnquiry'))
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

  /** Log a EnquiryService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`EnquiryService: ${message}`);
  }
}