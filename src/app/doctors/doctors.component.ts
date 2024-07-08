import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css'
})
export class DoctorsComponent {
  showModal = false;
  isEditMode = false;
  showConfirmModal = false;
  currentDoctor = { pwz: '', name: '' };
  currentIndex: number | null = null;
  deleteIndex: number | null = null;
  name = ""

  toggleModal() {
    this.showModal = !this.showModal;
  }

  openAddModal() {
    this.isEditMode = false;
    this.currentDoctor = {pwz: '', name: '' };
    this.toggleModal();
  }

  addDoctor() {
    this.doctors.push(this.currentDoctor);
    this.currentDoctor = {pwz: '', name: '' };
    this.toggleModal();
  }

  editDoctor(index: number) {
    this.isEditMode = true;
    this.currentIndex = index;
    this.currentDoctor = { ...this.doctors[index] };
    this.toggleModal();
  }

  updateDoctor() {
    if (this.currentIndex !== null) {
      this.doctors[this.currentIndex] = { ...this.currentDoctor };
    }
    this.currentDoctor = { pwz: '', name: '' };
    this.currentIndex = null;
    this.toggleModal();
  }

  confirmDelete(event: Event, index: number) {
    event.stopPropagation();

    this.deleteIndex = index;
    this.name = this.doctors[index].name
    this.toggleConfirmModal();
  }

  deleteDoctor() {

    if (this.deleteIndex !== null) {
      this.doctors.splice(this.deleteIndex, 1);
    }
    this.deleteIndex = null;
    this.name = ""
    this.toggleConfirmModal();
  }

  toggleConfirmModal() {

    this.showConfirmModal = !this.showConfirmModal;
  }

  doctors = [
    { pwz: '124322', name: 'John K'  },
    { pwz: '2221111', name: 'Jane D' },
  ];
}
