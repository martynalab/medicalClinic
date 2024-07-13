import {Injectable} from '@angular/core';
import {Appointment} from "../../model/Appointment.model";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private localStorageKey = 'appointments';

  constructor() {
  }

  private getAppointmentsFromLocalStorage(): Appointment[] {
    const data = localStorage.getItem(this.localStorageKey);
    return data ? JSON.parse(data) : [];
  }

  private saveAppointmentsToLocalStorage(appointments: Appointment[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(appointments));
  }

  getAppointments(): Appointment[] {
    return this.getAppointmentsFromLocalStorage();
  }

  getAppointmentById(id: number): Appointment | undefined {
    const appointments = this.getAppointmentsFromLocalStorage();
    return appointments.find(appointment => appointment.id === id);
  }

  addAppointment(appointment: Appointment): void {
    const appointments = this.getAppointmentsFromLocalStorage();
    appointment.id = this.generateId();
    appointments.push(appointment);
    this.saveAppointmentsToLocalStorage(appointments);
  }

  updateAppointment(updatedAppointment: Appointment): void {
    const appointments = this.getAppointmentsFromLocalStorage();
    const index = appointments.findIndex(appointment => appointment.id === updatedAppointment.id);
    if (index !== -1) {
      appointments[index] = updatedAppointment;
      this.saveAppointmentsToLocalStorage(appointments);
    }
  }

  deleteAppointment(id: number): void {
    let appointments = this.getAppointmentsFromLocalStorage();
    appointments = appointments.filter(appointment => appointment.id !== id);
    this.saveAppointmentsToLocalStorage(appointments);
  }

  private generateId(): number {
    const appointments = this.getAppointmentsFromLocalStorage();
    return appointments.length ? Math.max(...appointments.map(appointment => appointment.id)) + 1 : 1;
  }
}
