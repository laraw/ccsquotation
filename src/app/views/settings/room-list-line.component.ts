import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

import { Room } from '../../core/models';
import { RoomService } from '../../core/services'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: '[room-list-line]',
  templateUrl: 'room-list-line.component.html',
  styleUrls: ['./room-list-line.component.scss'],
})
export class RoomListLineComponent implements OnInit {
  @Input() room: Room;
  @Input() fieldName: string;
  contentEditable: boolean;
  editField: string;
  contentEditableClass: string;
  @Output() newItemEvent = new EventEmitter<Room>();

    constructor(

        private roomService: RoomService,
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
        this.room[property] = editField;
    }

    remove(room) {
        this.roomService.deleteRoom(room.id).subscribe(() => { this.toastr.success('Room was removed successfully');  });;
        this.newItemEvent.emit(room);
        
    }

 
    // remove(id: any) {
    
    // if(id) {
    //  
    // }
    // else {
    //     this.roomList.splice(id, 1);
    // }
    // }

    edit() {
        this.contentEditable = true;
        this.contentEditableClass = "form-control";
    }

    update() {
        this.updateRoom(this.room);
        this.contentEditable = false;
        this.contentEditableClass = "";
    // this.roomService.addRoom(this.room).subscribe();
    //     if(this.roomList[id].id == 0) {
    //         this.roomService.getAllRooms().subscribe(rooms => { 
    //             this.roomList[id].id = Math.max(...rooms.map(o=>o.id)) +1;
    //             this.roomService.addRoom(this.roomList[id]).subscribe();
    //         })
    //     } else {
            
    //     }
        
    }
    updateRoom(room: Room) {
        this.roomService.updateRoom(room).subscribe(() => { this.toastr.success('Room was updated successfully')});
    }
}