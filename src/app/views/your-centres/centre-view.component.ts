import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Centre, Room, Offering } from '../../core/models';
import { CentreService, RoomService } from '../../core/services';

import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-centre-view',
  templateUrl: './centre-view.component.html'

})
export class CentreViewComponent implements OnInit {
  @Input() centre: Centre;
  @Input() isSelected: boolean;
  

//   success: boolean;
//   dismissible = true;
//   alertsDismiss: any = [];
  rooms: Room[];
//   // private searchTerms = new Subject<string>();
//   isEditable: boolean;
//   offeringsIsEditable: boolean;
//   centreofferings: CentreOffering[] = [];
//   form: FormGroup;

  

  constructor(
    private route: ActivatedRoute,
    private centreService: CentreService,
    private roomService: RoomService,
    private location: Location,
  
    
  ) {
   
  }

  ngOnInit(): void {
      
    // const id = +this.route.snapshot.paramMap.get('id');

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

  
//   getOfferings(centreOfferings:number[]): void {


//     this.centreService.getOfferings()
//       .subscribe(
//         result => {
         
//           var offeringsInternal: CentreOffering[] = []; 
//           // this.getRooms();
//           result.forEach(function(item) {
            
//             if(centreOfferings.includes(item.id)) {
              
//               offeringsInternal.push( {
//                 offering: item.description,
//                 isSelected: true,
//                 offeringId: item.id

//               });
//             }
//             else {
              
//               offeringsInternal.push( {
//                 offering: item.description,
//                 isSelected: false,
//                 offeringId: item.id

//               });
//             }
//           })
//            this.centreofferings = offeringsInternal.sort((a, b) => (a.offering > b.offering) ? 1 : -1);

          
//         }
        
//         );
    
    
//   }


  getRooms(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.roomService.getRoomsByCentre(id).subscribe(rooms => this.rooms = rooms);
  }


  goBack(): void {
    this.location.back();
  }


}



