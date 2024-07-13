import {Injectable} from '@angular/core';
import {PatientModel} from "../../model/Patient.model";

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private readonly storageKey = 'patients';

  constructor() {
    this.loadPatients();
  }

  private patients: PatientModel[] = [];

  private savePatients() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.patients));
  }

  private loadPatients() {
    const savedPatients = localStorage.getItem(this.storageKey);
    if (savedPatients) {
      this.patients = JSON.parse(savedPatients);
    } else {
      this.patients = [
        {pesel: '123456112', name: 'John Doe', address: 'test'},
        {pesel: '82726252', name: 'Jane Smith', address: 'test1'}
      ];
    }
  }

  getPatients(): PatientModel[] {
    return this.patients;
  }

  addPatient(patient: PatientModel) {
    this.patients.push(patient);
    this.savePatients();
  }

  updatePatient(index: number, patient: PatientModel) {
    this.patients[index] = patient;
    this.savePatients();
  }

  deletePatient(index: number) {
    this.patients.splice(index, 1);
    this.savePatients();
  }
}
