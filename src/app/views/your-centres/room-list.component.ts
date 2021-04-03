import { Component, OnInit } from '@angular/core';
import { Room } from '../../core/models';
import { RoomService } from '../../core/services';

@Component({
  selector: 'room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})

export class RoomListComponent implements OnInit {
    editField: string;
    roomList: Room[];
    awaitingRoomList: Room[];
    newRoom: Room;
    contentEditable: boolean;
    centreId: number;

    ngOnInit(): void {
        this.centreId = 1;
        this.contentEditable = false;
    
        this.roomService.getRoomsByCentre(this.centreId).subscribe(rooms => { this.roomList = rooms; this.awaitingRoomList = rooms; } );
        
    }

    constructor(

        private roomService: RoomService,


        
      ) {}

      updateList(id: number, property: string, event: any) {
        const editField = event.target.textContent;
        this.roomList[id][property] = editField;
      }

    remove(id: any) {
      
      if(id) {
      this.roomService.deleteRoom(this.roomList[id].id).subscribe(() => { this.roomList.splice(id, 1); });;
      }
      else {
        this.roomList.splice(id, 1);
      }
    }

    add() {

      var newroom: Room = <Room> { };
      newroom.id = 0;
      newroom.centreId = this.centreId;
      newroom.childRatio = " ";
      newroom.staffRatio = " ";
      newroom.minAge = " ";
      newroom.maxAge = " ";
      newroom.dailyRate = " ";
      newroom.capacity = " ";
      this.roomList.push(newroom);
      this.contentEditable = true;
      

    }

    changeValue(id: number, property: string, event: any) {
        this.editField = event.target.textContent;
      }


    edit() {
        this.contentEditable = true;
    }

    update(id: number) {

        if(this.roomList[id].id == 0) {
            this.roomService.getAllRooms().subscribe(rooms => { 
                this.roomList[id].id = Math.max(...rooms.map(o=>o.id)) +1;
                this.roomService.addRoom(this.roomList[id]).subscribe();
              })
        } else {
            this.updateRoom(this.roomList[id]);
        }
        
    }
    updateRoom(room: Room) {
        this.roomService.updateRoom(room).subscribe(() => this.showSuccess());
    }
    showSuccess() {
        
    }
}