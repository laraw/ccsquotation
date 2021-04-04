// Angular

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Components Routing

import { MessagesComponent } from '../../views/error/messages.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { FamiliesComponent } from './families.component';
import { CrmRoutingModule } from './crm-routing.module'

@NgModule({
  imports: [

    FormsModule,
    CrmRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    ModalModule.forRoot()
    
  ],
  declarations: [


    MessagesComponent,
    FamiliesComponent

  ],
  exports: [
    

  ]
})
export class CrmModule { }
