import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {DoctorService} from "../service/doctor/doctor.service";
import {DoctorModel} from "../model/doctor.model";

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {
  showModal = false;
  isEditMode = false;
  showConfirmModal = false;
  currentDoctor: DoctorModel = {pwz: '', name: ''};
  currentIndex: number | null = null;
  deleteIndex: number | null = null;
  name: String = "";
  doctors: DoctorModel[] = [];

  constructor(private doctorService: DoctorService) {
  }

  ngOnInit() {
    this.doctors = this.doctorService.getDoctors();
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  openAddModal() {
    this.isEditMode = false;
    this.currentDoctor = {pwz: '', name: ''};
    this.toggleModal();
  }

  addDoctor() {
    this.doctorService.addDoctor(this.currentDoctor);
    this.doctors = this.doctorService.getDoctors(); // Update the local doctors array
    this.currentDoctor = {pwz: '', name: ''};
    this.toggleModal();
  }

  editDoctor(index: number) {
    this.isEditMode = true;
    this.currentIndex = index;
    this.currentDoctor = {...this.doctors[index]};
    this.toggleModal();
  }

  updateDoctor() {
    if (this.currentIndex !== null) {
      this.doctorService.updateDoctor(this.currentIndex, this.currentDoctor);
      this.doctors = this.doctorService.getDoctors(); // Update the local doctors array
    }
    this.currentDoctor = {pwz: '', name: ''};
    this.currentIndex = null;
    this.toggleModal();
  }

  confirmDelete(event: Event, index: number) {
    event.stopPropagation();
    this.deleteIndex = index;
    this.name = this.doctors[index].name;
    this.toggleConfirmModal();
  }

  deleteDoctor() {
    if (this.deleteIndex !== null) {
      this.doctorService.deleteDoctor(this.deleteIndex);
      this.doctors = this.doctorService.getDoctors(); // Update the local doctors array
    }
    this.deleteIndex = null;
    this.name = "";
    this.toggleConfirmModal();
  }

  toggleConfirmModal() {
    this.showConfirmModal = !this.showConfirmModal;
  }
}
