import { Component, Input } from '@angular/core';

import { Room } from '../../core/models';

@Component({
  selector: 'room-list-line',
  templateUrl: 'room-list-line.component.html'
})
export class RoomListLineComponent {
  @Input() room: Room;
  @Input() fieldName: string;
  @Input() contentEditable: boolean;

}