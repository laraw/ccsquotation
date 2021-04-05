// Angular

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Components Routing
import { SettingsRoutingModule } from './settings-routing.module';
import { CentreSearchComponent } from './centre-search.component';
import { MessagesComponent } from '../../views/error/messages.component';
import { CentreDetailComponent } from './centre-detail.component';
import { RoomListComponent } from './room-list.component';
import { RoomListLineComponent } from './room-list-line.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { OfferingListLineComponent } from './offerings-line.component';
import { OfferingsComponent } from './offerings.component';

@NgModule({
  imports: [

    FormsModule,
    SettingsRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    ModalModule.forRoot()
    
  ],
  declarations: [

    CentreSearchComponent,
    MessagesComponent,
    CentreDetailComponent,
    RoomListComponent,
    RoomListLineComponent,
    OfferingListLineComponent,
    OfferingsComponent

  ],
  exports: [
    

  ]
})
export class SettingsModule { }
