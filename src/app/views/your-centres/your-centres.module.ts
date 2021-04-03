// Angular

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Components Routing
import { YourCentresRoutingModule } from './your-centres-routing.module';
import { CentreQuoteComponent } from './centre-quote.component';
import { CentreSearchComponent } from './centre-search.component';
import { MessagesComponent } from '../../views/error/messages.component';
import { CentreDetailComponent } from './centre-detail.component';
import { RoomListComponent } from './room-list.component';
import { RoomListLineComponent } from './room-list-line.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [

    FormsModule,
    YourCentresRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    ModalModule.forRoot()
    
  ],
  declarations: [
    CentreQuoteComponent,
    CentreSearchComponent,
    MessagesComponent,
    CentreDetailComponent,
    RoomListComponent,
    RoomListLineComponent

  ],
  exports: [
    

  ]
})
export class YourCentresModule { }
