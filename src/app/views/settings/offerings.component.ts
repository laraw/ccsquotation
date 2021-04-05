import { Component, OnInit } from '@angular/core';
import { Offering } from '../../core/models';
import { OfferingService } from '../../core/services';
import { Input } from '@angular/core';
import { ViewChild} from '@angular/core';
import {ModalDirective, BsModalRef} from 'ngx-bootstrap/modal';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './offerings.component.html',

})

export class OfferingsComponent implements OnInit {

    offeringList: Offering[];

    // newOffering: Offering;
    @ViewChild('largeModal') public largeModal: ModalDirective;

    newOffering = new FormGroup( {
        name: new FormControl(''),
        description: new FormControl(''),
        icon: new FormControl(''),
    })

    ngOnInit(): void {
        // this.centreId = 1;

        this.offeringService.getOfferings().subscribe(offerings => { this.offeringList = offerings;  } );
        
    }

    constructor(

        private offeringService: OfferingService,


        
      ) {}

      onSubmit() {
        // TODO: Use EventEmitter with form value
        // console.warn(this.newOffering.value.name);
        let formvalues = this.newOffering.value;
 
        this.offeringService.getOfferings().subscribe(offerings => { 
               
                const newitem = {} as Offering;
                newitem.id = Math.max(...offerings.map(o=>o.id)) +1;;
                newitem.description = formvalues.description;
                newitem.icon = formvalues.icon;

                this.offeringService.addOffering(newitem).subscribe();
                this.offeringList.push(
                    newitem                

                );
                
        })
    }

 

    showSuccess() {
        
    }
}