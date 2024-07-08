import { Component, OnInit } from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})

export class PatientsComponent{
  showModal = false;
  isEditMode = false;
  showConfirmModal = false;
  currentPatient = { pesel: '', name: '', address: '' };
  currentIndex: number | null = null;
  deleteIndex: number | null = null;
  name = ""

  toggleModal() {
    this.showModal = !this.showModal;
  }

  openAddModal() {
    this.isEditMode = false;
    this.currentPatient = { pesel: '', name: '', address: ''  };
    this.toggleModal();
  }

  addPatient() {
    this.patients.push(this.currentPatient);
    this.currentPatient = { pesel: '', name: '', address: '' };
    this.toggleModal();
  }

  editPatient(index: number) {
    this.isEditMode = true;
    this.currentIndex = index;
    this.currentPatient = { ...this.patients[index] };
    this.toggleModal();
  }

  updatePatient() {
    if (this.currentIndex !== null) {
      this.patients[this.currentIndex] = { ...this.currentPatient };
    }
    this.currentPatient = { pesel: '', name: '', address: '' };
    this.currentIndex = null;
    this.toggleModal();
  }

  confirmDelete(event: Event, index: number) {
    event.stopPropagation();
    console.log('Confirming delete for patient at index:', index);
    this.deleteIndex = index;
    this.name = this.patients[index].name
    this.toggleConfirmModal();
  }

  deletePatient() {
    console.log('Deleting patient at index:', this.deleteIndex);
    if (this.deleteIndex !== null) {
      this.patients.splice(this.deleteIndex, 1);
    }
    this.deleteIndex = null;
    this.name = ""
    this.toggleConfirmModal();
  }

  toggleConfirmModal() {
    console.log('Toggling confirmation modal visibility. Current state:', this.showConfirmModal);
    this.showConfirmModal = !this.showConfirmModal;
  }

  patients = [
    { pesel:'123456112', name: 'John Doe', address: 'test' },
    { pesel:'82726252',name: 'Jane Smith', address: 'test1' },
  ];
}

