// Angular

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Components Routing


import { ModalModule } from 'ngx-bootstrap/modal';
import { FamiliesComponent } from './families.component';
import { CrmRoutingModule } from './crm-routing.module'
import { EnquiriesComponent } from './enquiries.component';
import { LeadsComponent } from './leads.component';
import { ToursComponent } from './tours.component';
import { FamilyComponent } from './family.component';
import { SharedModule } from '../shared/shared.module';
import { ContactEditComponent } from './contact-edit.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { NewEnquiryComponent } from './new-enquiry.component';

@NgModule({
  imports: [

    FormsModule,
    CrmRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    ModalModule.forRoot(),
    SharedModule,
    GooglePlaceModule
    
  ],
  declarations: [


    FamiliesComponent,
    EnquiriesComponent,
    LeadsComponent,
    ToursComponent,
    FamilyComponent, 
    ContactEditComponent,
    NewEnquiryComponent

  ],
  exports: [
    NewEnquiryComponent

  ]
})
export class CrmModule { }
