import {Component, OnDestroy, OnInit} from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { Input } from '@angular/core'
import { INavData } from '@coreui/angular';

@Component({
  templateUrl: './navi.component.html',
  selector: 'app-navi',
  styleUrls: [
    './navi.component.css'
  ]
})
export class NaviComponent implements OnInit  {
@Input() nav: INavData[];
class: string = "active";

ngOnInit() {
   
}

}