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

@NgModule({
  imports: [

    FormsModule,
    CrmRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    ModalModule.forRoot()
    
  ],
  declarations: [


    FamiliesComponent,
    EnquiriesComponent,
    LeadsComponent,
    ToursComponent

  ],
  exports: [
    

  ]
})
export class CrmModule { }
