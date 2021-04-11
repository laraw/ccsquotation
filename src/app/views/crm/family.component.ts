import { Component, Directive, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Contact, Child, Enquiry, Centre } from '../../core/models';
import { ContactService, ChildService, EnquiryService, CentreService } from '../../core/services';

import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { INavData } from '@coreui/angular';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  

})



export class FamilyComponent implements OnInit {
  
contact: Contact;
contactinitials: string = "";
selectedCentres: Centre[];
leftNav: INavData[] = [];

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private childService: ChildService,
    private enquiryService: EnquiryService,
    private location: Location,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private centreService: CentreService
  ) {}
 

  ngOnInit(): void {
    
   this.getContact();

  }

 

  getContact(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    this.contactService.getContact(id)
      .subscribe(
        contact  => {
          this.contact = contact;
          this.contactinitials = contact.firstName[0] + contact.lastName[0];
          this.leftNav = [ { icon: 'fa fa-binoculars', url: '/#/crm/families-detail/' + contact.id, name: 'Profile Overview', attributes: { active: true },  }, 
            
          { icon: 'fa fa-user', url: '/#/crm/contact-edit/' + contact.id, name: 'Personal Information', attributes: { active: false }}, 
          { icon: 'fa fa-child', name: 'Children', attributes: { active: false }}, 
          { icon: 'fa fa-envelope', name: 'Communication', attributes: { active: false }} 
         ];
         
         this.centreService.getCentres().subscribe(centres => {

            let centreresults = new Array<Centre>();
            centres.forEach(function(centre) {
                  var distanceBetween = this.getDistanceFromLatLonInKm(contact.addressLat, contact.addresssLng, centre.lat, centre.long);
                  
                  if(distanceBetween < 50) {
                    
                    centreresults.push(centre);
                    
                    
                  }
            }, this)    
            
            this.selectedCentres = centreresults;
      
          },);
          
        }
        
    );
    
  }


  goBack(): void {
    this.location.back();
  }

  showSuccess(message: string): void {
    // this.success = true;
    // this.toastr.success(message);
    // this.addAlert();
  }


  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  deg2rad(deg) {
    return deg * (Math.PI/180)
  }


//   edit() {
//     this.isEditable = true;
//   }


//   save(): void {
//     this.contactService.updateCentre(this.centre)
//       .subscribe(() => { this.showSuccess("Details were saved successfully"); this.isEditable = false; });
//   }

//   onCheckboxChange(e) {
//     const mychoices: FormArray = this.form.get('mychoices') as FormArray;
  
//     if (e.target.checked) {
//       mychoices.push(new FormControl(parseInt(e.target.value)));
//     } else {
//       let i: number = 0;
//       mychoices.controls.forEach((item: FormControl) => {
//         if (item.value == parseInt(e.target.value)) {
//           mychoices.removeAt(i);
//           return;
//         }
//         i++;
//       });
//     }
//   }

//   submitForm() {
//     this.centre.offering = this.form.value.mychoices;
//     this.centreService.updateCentre(this.centre)
//     .subscribe(() => { this.showSuccess("Details were saved successfully"); this.offeringsIsEditable = false; });
//   }
}


