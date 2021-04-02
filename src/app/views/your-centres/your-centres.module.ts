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

@NgModule({
  imports: [

    FormsModule,
    YourCentresRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    
    
  ],
  declarations: [
    CentreQuoteComponent,
    CentreSearchComponent,
    MessagesComponent,
    CentreDetailComponent

  ],
  exports: [
    

  ]
})
export class YourCentresModule { }
