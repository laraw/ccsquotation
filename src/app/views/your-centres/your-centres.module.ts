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



@NgModule({
  imports: [

    FormsModule,
    YourCentresRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    ModalModule.forRoot(),
    GoogleMapsModule,
    GooglePlaceModule
    
  ],
  declarations: [
    CentreQuoteComponent,
    FindACentreComponent,
    



  ],
  exports: [
    

  ]
})
export class YourCentresModule { }
