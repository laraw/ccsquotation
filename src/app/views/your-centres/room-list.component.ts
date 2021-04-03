import { Component, OnInit } from '@angular/core';
import { Room } from '../../core/models';
import { RoomService } from '../../core/services';
import { Input } from '@angular/core';
import { ViewChild} from '@angular/core';
import {ModalDirective, BsModalRef} from 'ngx-bootstrap/modal';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})

export class RoomListComponent implements OnInit {
    @Input() centreId: number;
    roomList: Room[];
    awaitingRoomList: Room[];
    // newRoom: Room;
    @ViewChild('largeModal') public largeModal: ModalDirective;

    newRoom = new FormGroup( {
        name: new FormControl(''),
        minAge: new FormControl(''),
        maxAge: new FormControl(''),
        childRatio: new FormControl(''),
        staffRatio: new FormControl(''),
        capacity: new FormControl(''),
        dailyRate: new FormControl('')
    })

    ngOnInit(): void {
        // this.centreId = 1;

        this.roomService.getRoomsByCentre(this.centreId).subscribe(rooms => { this.roomList = rooms; this.awaitingRoomList = rooms; } );
        
    }

    constructor(

        private roomService: RoomService,


        
      ) {}

      onSubmit() {
        // TODO: Use EventEmitter with form value
        // console.warn(this.newRoom.value.name);
        let formvalues = this.newRoom.value;
 
        this.roomService.getAllRooms().subscribe(rooms => { 
               
                const newitem = {} as Room;
                newitem.id = Math.max(...rooms.map(o=>o.id)) +1;;
                newitem.name = formvalues.name;
                newitem.minAge = formvalues.minAge;
                newitem.maxAge = formvalues.maxAge;
                newitem.childRatio = formvalues.childRatio;
                newitem.staffRatio = formvalues.staffRatio;
                newitem.capacity = formvalues.capacity;
                newitem.dailyRate = formvalues.dailyRate;
                newitem.centreId = this.centreId;
                this.roomService.addRoom(newitem).subscribe();
                this.roomList.push(
                    newitem                

                );
                
        })
    }

    add() {

    //   var newroom: Room = <Room> { };
    //   newroom.id = 0;
    //   newroom.centreId = this.centreId;
    //   newroom.childRatio = " ";
    //   newroom.staffRatio = " ";
    //   newroom.minAge = " ";
    //   newroom.maxAge = " ";
    //   newroom.dailyRate = " ";
    //   newroom.capacity = " ";
    //   this.roomList.push(newroom);

      

    }

    

    showSuccess() {
        
    }
}