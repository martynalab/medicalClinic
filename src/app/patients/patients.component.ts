import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {PatientService} from "../service/patient/patient.service";
import {PatientModel} from "../model/Patient.model";

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  showModal = false;
  isEditMode = false;
  showConfirmModal = false;
  currentPatient: PatientModel = {pesel: '', name: '', address: ''};
  currentIndex: number | null = null;
  deleteIndex: number | null = null;
  name = "";
  patients: PatientModel[] = [];

  constructor(private patientService: PatientService) {
  }

  ngOnInit() {
    this.patients = this.patientService.getPatients();
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  openAddModal() {
    this.isEditMode = false;
    this.currentPatient = {pesel: '', name: '', address: ''};
    this.toggleModal();
  }

  addPatient() {
    this.patientService.addPatient(this.currentPatient);
    this.patients = this.patientService.getPatients();
    this.currentPatient = {pesel: '', name: '', address: ''};
    this.toggleModal();
  }

  editPatient(index: number) {
    this.isEditMode = true;
    this.currentIndex = index;
    this.currentPatient = {...this.patients[index]};
    this.toggleModal();
  }

  updatePatient() {
    if (this.currentIndex !== null) {
      this.patientService.updatePatient(this.currentIndex, this.currentPatient);
      this.patients = this.patientService.getPatients();
    }
    this.currentPatient = {pesel: '', name: '', address: ''};
    this.currentIndex = null;
    this.toggleModal();
  }

  confirmDelete(event: Event, index: number) {
    event.stopPropagation();
    console.log('Confirming delete for patient at index:', index);
    this.deleteIndex = index;
    this.name = this.patients[index].name;
    this.toggleConfirmModal();
  }

  deletePatient() {
    console.log('Deleting patient at index:', this.deleteIndex);
    if (this.deleteIndex !== null) {
      this.patientService.deletePatient(this.deleteIndex);
      this.patients = this.patientService.getPatients();
    }
    this.deleteIndex = null;
    this.name = "";
    this.toggleConfirmModal();
  }

  toggleConfirmModal() {
    console.log('Toggling confirmation modal visibility. Current state:', this.showConfirmModal);
    this.showConfirmModal = !this.showConfirmModal;
  }
}
