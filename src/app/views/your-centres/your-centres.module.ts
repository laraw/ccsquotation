// Angular

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Components Routing
import { YourCentresRoutingModule } from './your-centres-routing.module';
import { CentreQuoteComponent } from './centre-quote.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { FindACentreComponent } from './find-a-centre.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { CentreViewComponent } from './centre-view.component';
import { SharedModule } from '../shared/shared.module';
import { TabsModule } from 'ngx-bootstrap/tabs';




@NgModule({
  imports: [

    FormsModule,
    YourCentresRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    ModalModule.forRoot(),
    GoogleMapsModule,
    GooglePlaceModule,
    SharedModule,
    TabsModule
  ],
  declarations: [
    CentreQuoteComponent,
    FindACentreComponent,
    CentreViewComponent,
    



  ],
  exports: [
    

  ]
})
export class YourCentresModule { }
