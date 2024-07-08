import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent {
  showModal = false;
  isEditMode = false;
  showConfirmModal = false;
  currentRoom = { number: '', status: false};
  currentIndex: number | null = null;
  deleteIndex: number | null = null;
  number = ""

  toggleModal() {
    this.showModal = !this.showModal;
  }

  openAddModal() {
    this.isEditMode = false;
    this.currentRoom = { number: '', status: false};
    this.toggleModal();
  }

  addRoom() {
    this.rooms.push(this.currentRoom);
    this.currentRoom = { number: '', status: false };
    this.toggleModal();
  }

  editRoom(index: number) {
    this.isEditMode = true;
    this.currentIndex = index;
    this.currentRoom = { ...this.rooms[index] };
    this.toggleModal();
  }

  updateRoom() {
    if (this.currentIndex !== null) {
      this.rooms[this.currentIndex] = { ...this.currentRoom };
    }
    this.currentRoom = { number: '', status: false};
    this.currentIndex = null;
    this.toggleModal();
  }

  confirmDelete(event: Event, index: number) {
    event.stopPropagation();
    this.deleteIndex = index;
    this.number = this.rooms[index].number
    this.toggleConfirmModal();
  }

  deleteRoom() {
    if (this.deleteIndex !== null) {
      this.rooms.splice(this.deleteIndex, 1);
    }
    this.deleteIndex = null;
    this.number = ""
    this.toggleConfirmModal();
  }

  toggleConfirmModal() {
    this.showConfirmModal = !this.showConfirmModal;
  }

  rooms = [
    { number: '2', status: true },
    { number: '4', status: false},
  ];
}
