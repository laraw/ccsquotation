import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Centre } from '../../core/models';
import { CentreService } from '../../core/services';

@Component({
  selector: 'app-centre-detail',
  templateUrl: './centre-detail.component.html'

})
export class CentreDetailComponent implements OnInit {
  centre: Centre;
  success: boolean;
  dismissible = true;
  alertsDismiss: any = [];
  constructor(
    private route: ActivatedRoute,
    private centreService: CentreService,
    private location: Location
  ) {}

  ngOnInit(): void {
    console.log("hello world");
    this.success = false;
    this.getCentre();
  }

  getCentre(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.centreService.getCentre(id)
      .subscribe(centre => this.centre = centre);
  }


  getRooms(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.centreService.getCentre(id)
      .subscribe(centre => this.centre = centre);
  }



  goBack(): void {
    this.location.back();
  }

  showSuccess(): void {
    this.success = true;
    this.addAlert();
  }

  addAlert(): void {
    this.alertsDismiss.push({
      type: 'info',
      msg: `This alert will be closed in 5 seconds (added: ${new Date().toLocaleTimeString()})`,
      timeout: 5000
    });
  }

  save(): void {
    this.centreService.updateCentre(this.centre)
      .subscribe(() => this.showSuccess());
  }
}