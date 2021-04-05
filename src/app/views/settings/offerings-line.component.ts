import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

import { Offering } from '../../core/models';
import { OfferingService } from '../../core/services'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: '[offerings-line]',
  templateUrl: 'offerings-line.component.html',
  styleUrls: ['./offerings-line.component.scss'],
})
export class OfferingListLineComponent implements OnInit {
  @Input() offering: Offering;
  @Input() fieldName: string;
  contentEditable: boolean;
  editField: string;
  contentEditableClass: string;
  @Output() lineChange = new EventEmitter<boolean>();

    constructor(

        private offeringService: OfferingService,
        private toastr: ToastrService


        
    ) {}

    ngOnInit() {
        this.contentEditable = false;
        this.contentEditableClass = "";
    }
    

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }

    updateList(id: number, property: string, event: any) {
        const editField = event.target.textContent;
        this.offering[property] = editField;
    }

    remove(offering) {
        this.offeringService.deleteOffering(offering.id).subscribe(() => { this.toastr.success('Offering was removed successfully')  });;
        
    }
    // remove(id: any) {
    
    // if(id) {
    //  
    // }
    // else {
    //     this.offeringList.splice(id, 1);
    // }
    // }

    edit() {
        this.contentEditable = true;
        this.contentEditableClass = "form-control";
    }

    update() {
        this.updateOffering(this.offering);
        this.contentEditable = false;
        this.contentEditableClass = "";
    // this.offeringService.addOffering(this.offering).subscribe();
    //     if(this.offeringList[id].id == 0) {
    //         this.offeringService.getAllOfferings().subscribe(offerings => { 
    //             this.offeringList[id].id = Math.max(...offerings.map(o=>o.id)) +1;
    //             this.offeringService.addOffering(this.offeringList[id]).subscribe();
    //         })
    //     } else {
            
    //     }
        
    }
    updateOffering(offering: Offering) {
        this.offeringService.updateOffering(offering).subscribe(() => { this.toastr.success('Offering was updated successfully')});
    }
}