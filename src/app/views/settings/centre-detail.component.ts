import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Centre, Room, Offering } from '../../core/models';
import { CentreService, RoomService } from '../../core/services';

import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-centre-detail',
  templateUrl: './centre-detail.component.html',
  styleUrls:[ './centre-detail.component.css']

})
export class CentreDetailComponent implements OnInit {
  centre: Centre;
  success: boolean;
  dismissible = true;
  alertsDismiss: any = [];
  rooms: Room[];
  // private searchTerms = new Subject<string>();
  isEditable: boolean;
  offeringsIsEditable: boolean;
  centreofferings: CentreOffering[] = [];
  form: FormGroup;

  

  constructor(
    private route: ActivatedRoute,
    private centreService: CentreService,
    private roomService: RoomService,
    private location: Location,
    private fb: FormBuilder,
    private toastr: ToastrService
    
  ) {
    this.form = this.fb.group({
      checkArray: this.fb.array([]),
      mychoices: new FormArray([])
      
    })
  }

  ngOnInit(): void {
    
    this.isEditable = false;
    this.success = false;
    this.offeringsIsEditable = false;
    this.getCentre();
   

  }

  getCentre(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    this.centreService.getCentre(id)
      .subscribe(
        centre => {
          this.centre = centre;
          // this.getRooms();
          this.getOfferings(this.centre.offering);
          
          
        }
        
        );
    
    
  }

  
  getOfferings(centreOfferings:number[]): void {


    this.centreService.getOfferings()
      .subscribe(
        result => {
         
          var offeringsInternal: CentreOffering[] = []; 
          // this.getRooms();
          result.forEach(function(item) {
            
            if(centreOfferings.includes(item.id)) {
              
              offeringsInternal.push( {
                offering: item.description,
                isSelected: true,
                offeringId: item.id

              });
            }
            else {
              
              offeringsInternal.push( {
                offering: item.description,
                isSelected: false,
                offeringId: item.id

              });
            }
          })
           this.centreofferings = offeringsInternal.sort((a, b) => (a.offering > b.offering) ? 1 : -1);
           this.setFormOptions(this.centreofferings);
          
        }
        
        );
    
    
  }

  setFormOptions(centreOptions: CentreOffering[]): void {

    const offeringsInternal: FormArray = this.form.get('mychoices') as FormArray;
    centreOptions.forEach(function(item) {
      if(item.isSelected) {
        offeringsInternal.push(new FormControl(item.offeringId));
      }
     
    });
    this.form.value.mychoices = offeringsInternal;
    
  }


  getRooms(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.roomService.getRoomsByCentre(id).subscribe(rooms => this.rooms = rooms);
  }


  goBack(): void {
    this.location.back();
  }

  showSuccess(message: string): void {
    this.success = true;
    this.toastr.success(message);
    // this.addAlert();
  }

  addAlert(): void {
    this.alertsDismiss.push({
      type: 'info',
      msg: `This alert will be closed in 5 seconds (added: ${new Date().toLocaleTimeString()})`,
      timeout: 5000
    });
  }

  edit() {
    this.isEditable = true;
  }

  editOfferings() {
    this.offeringsIsEditable = true;
  }

  save(): void {
    this.centreService.updateCentre(this.centre)
      .subscribe(() => { this.showSuccess("Details were saved successfully"); this.isEditable = false; });
  }

  onCheckboxChange(e) {
    const mychoices: FormArray = this.form.get('mychoices') as FormArray;
  
    if (e.target.checked) {
      mychoices.push(new FormControl(parseInt(e.target.value)));
    } else {
      let i: number = 0;
      mychoices.controls.forEach((item: FormControl) => {
        if (item.value == parseInt(e.target.value)) {
          mychoices.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  submitForm() {
    this.centre.offering = this.form.value.mychoices;
    this.centreService.updateCentre(this.centre)
    .subscribe(() => { this.showSuccess("Details were saved successfully"); this.offeringsIsEditable = false; });
  }
}



export class CentreOffering {
  offeringId: number;
  offering: string;
  isSelected: boolean;
}
