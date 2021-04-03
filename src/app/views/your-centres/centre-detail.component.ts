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
  selector: 'app-centre-detail',
  templateUrl: './centre-detail.component.html'

})
export class CentreDetailComponent implements OnInit {
  centre: Centre;
  success: boolean;
  dismissible = true;
  alertsDismiss: any = [];
  rooms: Room[];
  private searchTerms = new Subject<string>();


  constructor(
    private route: ActivatedRoute,
    private centreService: CentreService,
    private roomService: RoomService,
    private location: Location,
    
  ) {}

  ngOnInit(): void {
    
    console.log("hello world");
    this.success = false;
    this.getCentre();

  }

  getCentre(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.centreService.getCentre(id)
      .subscribe(
        centre => {
          this.centre = centre;
          this.getRooms();
        }
        
        );
    
    
  }


  getRooms(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.roomService.getRoomsByCentre(id).subscribe(rooms => this.rooms = rooms);
  }



  goBack(): void {
    this.location.back();
  }

  showSuccess(): void {
    this.success = true;
    this.addAlert();
  }

  addAlert(): void {
    this.alertsDismiss.push({
      type: 'info',
      msg: `This alert will be closed in 5 seconds (added: ${new Date().toLocaleTimeString()})`,
      timeout: 5000
    });
  }

  save(): void {
    this.centreService.updateCentre(this.centre)
      .subscribe(() => this.showSuccess());
  }
}