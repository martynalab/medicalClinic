import {Injectable} from '@angular/core';
import {RoomModel} from "../../model/Room.model";

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private readonly storageKey = 'rooms';

  constructor() {
    this.loadRooms();
  }

  private rooms: RoomModel[] = [];

  private saveRooms() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.rooms));
  }

  private loadRooms() {
    const savedRooms = localStorage.getItem(this.storageKey);
    if (savedRooms) {
      this.rooms = JSON.parse(savedRooms);
    } else {
      this.rooms = [
        {number: '2', status: true},
        {number: '4', status: false}
      ];
    }
  }

  getRooms(): RoomModel[] {
    return this.rooms;
  }

  addRoom(room: RoomModel) {
    this.rooms.push(room);
    this.saveRooms();
  }

  updateRoom(index: number, room: RoomModel) {
    this.rooms[index] = room;
    this.saveRooms();
  }

  deleteRoom(index: number) {
    this.rooms.splice(index, 1);
    this.saveRooms();
  }
}
