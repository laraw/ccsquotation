// Angular

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Components Routing


import { ModalModule } from 'ngx-bootstrap/modal';
import { CarouselSharedComponent } from './carousel-shared.component';

// Carousel Component
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NaviComponent } from './navi.component';

@NgModule({
  imports: [

    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ModalModule.forRoot(),
    CarouselModule
    
  ],
  declarations: [

    CarouselSharedComponent,
    NaviComponent

  ],
  exports: [
    CarouselSharedComponent,
    NaviComponent

  ]
})
export class SharedModule { }
