import {Injectable} from '@angular/core';
import {DoctorModel} from '../../model/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private doctors: DoctorModel[] = [
    {pwz: '124322', name: 'John K'},
    {pwz: '2221111', name: 'Jane D'},
  ];

  constructor() {
  }

  getDoctors(): DoctorModel[] {
    return this.doctors;
  }

  addDoctor(doctor: DoctorModel) {
    this.doctors.push(doctor);
  }

  updateDoctor(index: number, doctor: DoctorModel) {
    this.doctors[index] = doctor;
  }

  deleteDoctor(index: number) {
    this.doctors.splice(index, 1);
  }
}
