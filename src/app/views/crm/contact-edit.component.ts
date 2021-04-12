import { Component, Directive, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Contact, Child, Enquiry } from '../../core/models';
import { ContactService, ChildService, EnquiryService } from '../../core/services';

import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { INavData } from '@coreui/angular';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  

})



export class ContactEditComponent implements OnInit {
    @ViewChild("placesRef") placesRef : GooglePlaceDirective;
  
    contact: Contact;
    contactinitials: string = "";
    
    leftNav: INavData[] = [];
    contactEditForm = new FormGroup({
        firstName: new FormControl('', Validators.required)  ,
        lastName: new FormControl('', Validators.required),
        crn: new FormControl(''),
        dob: new FormControl(''),
        email: new FormControl('', Validators.required),
        phone: new FormControl(''),
        address: new FormControl('')
      });
                    
      constructor(
        private route: ActivatedRoute,
        private contactService: ContactService,
        private childService: ChildService,
        private enquiryService: EnquiryService,
        private location: Location,
        private fb: FormBuilder,
        private toastr: ToastrService,

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
         
              this.leftNav = [ { icon: 'fa fa-binoculars', url: '/#/crm/families-detail/' + contact.id, name: 'Profile Overview', attributes: { active: false },  }, 
            
              { icon: 'fa fa-user', url: '/#/crm/contact-edit/' + contact.id, name: 'Personal Information', attributes: { active: true }}, 
              { icon: 'fa fa-child', name: 'Children', attributes: { active: false }}, 
              { icon: 'fa fa-envelope', name: 'Communication', attributes: { active: false }} 
             ];
              
             this.contactEditForm.patchValue({
                firstName: contact.firstName,
                lastName: contact.lastName,
                crn: contact.crn,
                // dob: contact.dob,
                email: contact.email,
                phone: contact.phone,
                address: contact.address,
               

              });
            }
            
        );
      }

      onSubmit(): void {
          
            console.log(this.contactEditForm.value.address);
            this.contact.firstName = this.contactEditForm.value.firstName;
            this.contact.lastName = this.contactEditForm.value.lastName;
            this.contact.crn = this.contactEditForm.value.crn;
            // this.contact.dob = this.contactEditForm.value.dob;
            this.contact.email = this.contactEditForm.value.email;
            this.contact.phone = this.contactEditForm.value.phone;
            this.contactService.updateContact(this.contact).subscribe(() => this.toastr.success("The details were saved successfully"));
      }

      public handleAddressChange(address: Address) {
        // Do some stuff

        this.contact.address = address.formatted_address;
        this.contact.addressLat = address.geometry.location.lat();        
        this.contact.addresssLng = address.geometry.location.lng();

       
        
    }
    

    
}