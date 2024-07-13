import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {Appointment} from "../model/Appointment.model";
import {DoctorModel} from "../model/Doctor.model";
import {PatientModel} from "../model/Patient.model";
import {RoomModel} from "../model/Room.model";
import {AppointmentService} from "../service/appointment/appointment.service";
import {DoctorService} from "../service/doctor/doctor.service";
import {PatientService} from "../service/patient/patient.service";
import {RoomService} from "../service/room/room.service";

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent implements OnInit {
  appointments: Appointment[] = [];
  doctors: DoctorModel[] = [];
  patients: PatientModel[] = [];
  rooms: RoomModel[] = [];

  showModal = false;
  showConfirmModal = false;
  isEditMode = false;
  currentAppointment: Appointment = {
    id: 0,
    patientId: '',
    doctorPwz: '',
    roomNumber: '',
    date: '',
    time: ''
  };
  currentIndex: number | null = null;

  constructor(
    private appointmentService: AppointmentService,
    private doctorService: DoctorService,
    private patientService: PatientService,
    private roomService: RoomService
  ) {
  }

  ngOnInit(): void {
    this.loadAppointments();
    this.loadDoctors();
    this.loadPatients();
    this.loadRooms();
  }

  loadAppointments() {
    this.appointments = this.appointmentService.getAppointments();
  }

  loadDoctors() {
    this.doctors = this.doctorService.getDoctors();
  }

  loadPatients() {
    this.patients = this.patientService.getPatients();
  }

  loadRooms() {
    this.rooms = this.roomService.getRooms();
  }

  openAddModal() {
    this.isEditMode = false;
    this.currentAppointment = {
      id: 0,
      patientId: '',
      doctorPwz: '',
      roomNumber: '',
      date: '',
      time: ''
    };
    this.showModal = true;
  }

  addAppointment() {
    // Assuming appointment ID is generated automatically by the service
    this.appointmentService.addAppointment(this.currentAppointment);
    this.showModal = false;
    this.loadAppointments(); // Reload appointments after adding
  }

  editAppointment(index: number) {
    this.isEditMode = true;
    this.currentIndex = index;
    this.currentAppointment = {...this.appointments[index]};
    this.showModal = true;
  }

  updateAppointment() {
    if (this.currentIndex !== null) {
      this.appointmentService.updateAppointment(this.currentAppointment);
      this.showModal = false;
      this.loadAppointments();
    }
  }

  confirmDelete(event: Event, index: number) {
    event.stopPropagation();
    this.currentIndex = index;
    this.showConfirmModal = true;
  }

  deleteAppointment() {
    if (this.currentIndex !== null) {
      this.appointmentService.deleteAppointment(this.currentIndex);
      this.showConfirmModal = false;
      this.loadAppointments(); // Reload appointments after deleting
    }
  }

  toggleConfirmModal() {
    this.showConfirmModal = !this.showConfirmModal;
  }

  getPatientDisplayName(pesel: string): string {
    const patient = this.patients.find(p => p.pesel === pesel);
    return patient ? `${patient.name} (${patient.pesel})` : '';
  }

  getDoctorDisplayName(pwz: string): string {
    const doctor = this.doctors.find(d => d.pwz === pwz);
    return doctor ? `${doctor.name} (${doctor.pwz})` : '';
  }

}
