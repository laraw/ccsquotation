import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Centre } from '../../core/models';
import { CentreService } from '../../core/services';

@Component({
  selector: 'find-a-centre',
  templateUrl: './find-a-centre.component.html' 
})
export class FindACentreComponent implements OnInit {
  centres$: Observable<Centre[]>;
  private searchTerms = new Subject<string>();

  constructor(private centreService: CentreService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.centres$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.centreService.searchCentres(term)),
    );
  }
}