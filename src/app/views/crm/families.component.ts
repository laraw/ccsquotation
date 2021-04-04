import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { Centre, Room } from '../../core/models';
import { CentreService, RoomService } from '../../core/services';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

@Component({
  selector: 'families',
  templateUrl: './families.component.html'

})
export class FamiliesComponent {

}