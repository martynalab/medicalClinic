import {Injectable} from '@angular/core';
import {DoctorModel} from "../../model/Doctor.model";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private readonly storageKey = 'doctors';

  constructor() {
    this.loadDoctors();
  }

  private doctors: DoctorModel[] = [];

  private defaultWorkingHours = [
    {day: 'Monday', start: '08:00', end: '16:00'},
    {day: 'Tuesday', start: '08:00', end: '16:00'},
    {day: 'Wednesday', start: '08:00', end: '16:00'},
    {day: 'Thursday', start: '08:00', end: '16:00'},
    {day: 'Friday', start: '08:00', end: '16:00'}
  ];

  private saveDoctors() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.doctors));
  }

  private loadDoctors() {
    const savedDoctors = localStorage.getItem(this.storageKey);
    if (savedDoctors) {
      this.doctors = JSON.parse(savedDoctors);
    } else {
      this.doctors = [
        {pwz: '124322', name: 'John K', workingHours: this.defaultWorkingHours},
        {pwz: '2221111', name: 'Jane D', workingHours: this.defaultWorkingHours}
      ];
    }
  }

  getDoctors(): DoctorModel[] {
    return this.doctors;
  }

  addDoctor(doctor: DoctorModel) {
    doctor.workingHours = this.defaultWorkingHours;
    this.doctors.push(doctor);
    this.saveDoctors();
  }

  updateDoctor(index: number, doctor: DoctorModel) {
    this.doctors[index] = doctor;
    this.saveDoctors();
  }

  deleteDoctor(index: number) {
    this.doctors.splice(index, 1);
    this.saveDoctors();
  }
}
