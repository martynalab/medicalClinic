import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {RoomModel} from "../model/Room.model";
import {RoomService} from "../service/room/room.service";

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  showModal = false;
  isEditMode = false;
  showConfirmModal = false;
  currentRoom: RoomModel = {number: '', status: false};
  currentIndex: number | null = null;
  deleteIndex: number | null = null;
  number: String = "";
  rooms: RoomModel[] = [];

  constructor(private roomService: RoomService) {
  }

  ngOnInit() {
    this.rooms = this.roomService.getRooms();
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  openAddModal() {
    this.isEditMode = false;
    this.currentRoom = {number: '', status: false};
    this.toggleModal();
  }

  addRoom() {
    this.roomService.addRoom(this.currentRoom);
    this.rooms = this.roomService.getRooms(); // Update the local rooms array
    this.currentRoom = {number: '', status: false};
    this.toggleModal();
  }

  editRoom(index: number) {
    this.isEditMode = true;
    this.currentIndex = index;
    this.currentRoom = {...this.rooms[index]};
    this.toggleModal();
  }

  updateRoom() {
    if (this.currentIndex !== null) {
      this.roomService.updateRoom(this.currentIndex, this.currentRoom);
      this.rooms = this.roomService.getRooms(); // Update the local rooms array
    }
    this.currentRoom = {number: '', status: false};
    this.currentIndex = null;
    this.toggleModal();
  }

  confirmDelete(event: Event, index: number) {
    event.stopPropagation();
    this.deleteIndex = index;
    this.number = this.rooms[index].number;
    this.toggleConfirmModal();
  }

  deleteRoom() {
    if (this.deleteIndex !== null) {
      this.roomService.deleteRoom(this.deleteIndex);
      this.rooms = this.roomService.getRooms(); // Update the local rooms array
    }
    this.deleteIndex = null;
    this.number = "";
    this.toggleConfirmModal();
  }

  toggleConfirmModal() {
    this.showConfirmModal = !this.showConfirmModal;
  }
}
