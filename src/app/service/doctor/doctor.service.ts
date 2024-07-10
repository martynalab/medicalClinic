import {Injectable} from '@angular/core';
import {DoctorModel} from '../../model/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private readonly storageKey = 'doctors';

  constructor() {
    this.loadDoctors();
  }

  private doctors: DoctorModel[] = [];

  private saveDoctors() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.doctors));
  }

  private loadDoctors() {
    const savedDoctors = localStorage.getItem(this.storageKey);
    if (savedDoctors) {
      this.doctors = JSON.parse(savedDoctors);
    } else {
      this.doctors = [
        {pwz: '124322', name: 'John K'},
        {pwz: '2221111', name: 'Jane D'}
      ];
    }
  }

  getDoctors(): DoctorModel[] {
    return this.doctors;
  }

  addDoctor(doctor: DoctorModel) {
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
