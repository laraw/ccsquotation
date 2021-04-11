import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Centre, Room, Offering } from '../../core/models';
import { CentreService, OfferingService, RoomService } from '../../core/services';

import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { pulseAnimation, bounceAnimation, bounceInRightAnimation } from 'angular-animations';
import { EventEmitter } from '@angular/core'


@Component({
  selector: 'app-centre-view',
  templateUrl: './centre-view.component.html',
  animations: [ pulseAnimation({ anchor: 'pulse' }), bounceInRightAnimation() ]

})
export class CentreViewComponent implements OnInit {
  @Input() centre: Centre;
  @Input() isSelected: boolean;
  @Input() private centreChanged: EventEmitter<boolean>;

  offerings: Offering[] = [];
  centreofferings: any[] = [];
  offeringConfig: Offering[];
  rooms: Room[];

    /* Animations */

    animation = 'bounceInRight';
    animationState = false;
    animationWithState = false;
    hueBtnState = false;
  

  constructor(
    private route: ActivatedRoute,
    private centreService: CentreService,
    private roomService: RoomService,
    private location: Location,
    private offeringService: OfferingService

  
    
  ) {
   
  }

  ngOnInit(): void {


    if (this.centreChanged) {
      this.centreChanged.subscribe(data => {
        this.animate();
      }, this);
    }
     
    /* TODO - this is fkn terrible, i will need to implement a real API call which returns offering description and icon when calling centre data */

    this.offeringService.getOfferings().subscribe(offerings => { 
      this.offeringConfig = offerings;  
      
      this.centre.offering.forEach(function(centreoffering) {
        console.log(this.offeringConfig.find(item => item.id === centreoffering));
        if(this.offeringConfig.find(item => item.id === centreoffering)) {
              this.centreofferings.push(this.offeringConfig.find(item => item.id === centreoffering));
        }
      }, this)

    
    } );
      
  

    // this.centre.offering.forEach(function(offering) {
    //   var result = offeringConfig.find(obj => {
    //     return obj.id === offering;
    //   })
    //   console.log(result);

    // })
    // // const id = +this.route.snapshot.paramMap.get('id');

    // this.centreService.getCentre(id)
    //   .subscribe(
    //     centre => {
    //       this.centre = centre;
    //       // this.getRooms();
    //     //   this.getOfferings(this.centre.offering);'
    //     console.log(centre.name);
          
          
    //     }
        
    //     );
   

  }

  getCentre(): void {
    const id = +this.route.snapshot.paramMap.get('id');



    this.centreService.getCentre(id)
      .subscribe(
        centre => {
          this.centre = centre;
          // this.getRooms();
        //   this.getOfferings(this.centre.offering);'
        console.log(centre.name);
          
          
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

  
  animate() {
    this.animationState = false;
    setTimeout(() => {
      this.animationState = true;
      this.animationWithState = !this.animationWithState;
    }, 1);
  }


}



