import {Injectable} from '@angular/core';
import {PatientModel} from "../../model/Patient.model";

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private patients: PatientModel[] = [
    {pesel: '123456112', name: 'John Doe', address: 'test'},
    {pesel: '82726252', name: 'Jane Smith', address: 'test1'}
  ];

  constructor() {
  }

  getPatients(): PatientModel[] {
    return this.patients;
  }

  addPatient(patient: PatientModel) {
    this.patients.push(patient);
  }

  updatePatient(index: number, patient: PatientModel) {
    this.patients[index] = patient;
  }

  deletePatient(index: number) {
    this.patients.splice(index, 1);
  }
}
