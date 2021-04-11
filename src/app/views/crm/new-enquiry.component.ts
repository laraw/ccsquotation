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
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-new-enquiry',
  templateUrl: './new-enquiry.component.html',
  

})



export class NewEnquiryComponent implements OnInit {
    @ViewChild("placesRef") placesRef : GooglePlaceDirective;
    @ViewChild('largeModal') public largeModal: ModalDirective;
    @Input() centreId: number;
    contact: Contact;
    child: Child;
    contactinitials: string = "";

    
    leftNav: INavData[] = [];
    newEnquiryForm = new FormGroup({
        contactfirstName: new FormControl('', Validators.required)  ,
        contactlastName: new FormControl('', Validators.required),
        contactcrn: new FormControl('', Validators.pattern("\d{9}\w{1}")),
        contactdob: new FormControl(''),
        email: new FormControl('',  [ Validators.required, Validators.email ] ),
        phone: new FormControl(''),
        address: new FormControl(''),
        childfirstName: new FormControl('', Validators.required)  ,
        childlastName: new FormControl('', Validators.required),
        childcrn: new FormControl(''),
        childdob: new FormControl(''),
        startdate: new FormControl(''),
        tourdate: new FormControl('')
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
        
       

    
      }
    
  

      onSubmit(): void {
          console.log(this.newEnquiryForm.value)
            // console.log(this.newEnquiryForm.value.address);
            // this.contact.firstName = this.newEnquiryForm.value.contactfirstName;
            // this.contact.lastName = this.newEnquiryForm.value.contactlastName;
            // this.contact.crn = this.newEnquiryForm.value.contactcrn;
            // // this.contact.dob = this.contactEditForm.value.dob;
            // this.contact.email = this.newEnquiryForm.value.email;
            // this.contact.phone = this.newEnquiryForm.value.phone;
            // this.contactService.addContact(this.contact).subscribe(() => this.toastr.success("The details were saved successfully"));
      }

      public handleAddressChange(address: Address) {
        // Do some stuff

        this.contact.address = address.formatted_address;
        this.contact.addressLat = address.geometry.location.lat();        
        this.contact.addresssLng = address.geometry.location.lng();

       
        
    }
    

    
}