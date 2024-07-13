import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {DoctorModel} from "../model/Doctor.model";
import {DoctorService} from "../service/doctor/doctor.service";

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
  currentDoctor: DoctorModel = {pwz: '', name: '', workingHours: []};
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
    this.currentDoctor = {
      pwz: '',
      name: '',
      workingHours: [
        {day: 'Monday', start: '08:00', end: '16:00'},
        {day: 'Tuesday', start: '08:00', end: '16:00'},
        {day: 'Wednesday', start: '08:00', end: '16:00'},
        {day: 'Thursday', start: '08:00', end: '16:00'},
        {day: 'Friday', start: '08:00', end: '16:00'},
      ]
    };
    this.toggleModal();
  }

  addDoctor() {
    const newDoctor: DoctorModel = {...this.currentDoctor};
    console.log(newDoctor);
    this.doctorService.addDoctor(newDoctor);
    this.doctors = this.doctorService.getDoctors();
    this.currentDoctor = {pwz: '', name: '', workingHours: []};
    this.toggleModal();
  }

  editDoctor(index: number) {
    this.isEditMode = true;
    this.currentIndex = index;
    this.currentDoctor = {
      ...this.doctors[index],
      workingHours: this.doctors[index].workingHours.map(hours => ({...hours}))
    };
    this.toggleModal();
  }

  updateDoctor() {
    if (this.currentIndex !== null) {
      const updatedDoctor: DoctorModel = {...this.currentDoctor};
      this.doctorService.updateDoctor(this.currentIndex, updatedDoctor);
      this.doctors = this.doctorService.getDoctors();
    }
    this.currentDoctor = {pwz: '', name: '', workingHours: []};
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
      this.doctors = this.doctorService.getDoctors();
    }
    this.deleteIndex = null;
    this.name = "";
    this.toggleConfirmModal();
  }

  toggleConfirmModal() {
    this.showConfirmModal = !this.showConfirmModal;
  }

  trackByFn(index: number) {
    return index;
  }
}
