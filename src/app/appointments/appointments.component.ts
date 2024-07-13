import {Component, OnInit} from '@angular/core';
import {Appointment} from "../model/Appointment.model";
import {DoctorModel} from "../model/Doctor.model";
import {RoomModel} from "../model/Room.model";
import {AppointmentService} from "../service/appointment/appointment.service";
import {DoctorService} from "../service/doctor/doctor.service";
import {RoomService} from "../service/room/room.service";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

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
  rooms: RoomModel[] = [];
  currentAppointment: Appointment = {id: 0, patientId: '', doctorPwz: '', roomNumber: '', date: '', time: ''};
  isEditMode = false;
  showModal = false;
  showConfirmModal = false;
  appointmentToDelete: number | null = null;

  constructor(
    private appointmentService: AppointmentService,
    private doctorService: DoctorService,
    private roomService: RoomService
  ) {
  }

  ngOnInit(): void {
    this.loadAppointments();
    this.loadDoctors();
    this.loadRooms();
  }

  loadAppointments(): void {
    this.appointments = this.appointmentService.getAppointments();
  }

  loadDoctors(): void {
    this.doctors = this.doctorService.getDoctors();
  }

  loadRooms(): void {
    this.rooms = this.roomService.getRooms();
  }

  addAppointment(): void {
    this.currentAppointment.id = new Date().getTime();
    this.appointmentService.addAppointment(this.currentAppointment);
    this.closeModal();
    this.loadAppointments();
  }

  updateAppointment(): void {
    this.appointmentService.updateAppointment(this.currentAppointment);
    this.closeModal();
    this.loadAppointments();
  }

  editAppointment(index: number): void {
    this.isEditMode = true;
    this.currentAppointment = {...this.appointments[index]};
    this.showModal = true;
  }

  openAddModal(): void {
    this.isEditMode = false;
    this.currentAppointment = {id: 0, patientId: '', doctorPwz: '', roomNumber: '', date: '', time: ''};
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.resetForm();
  }

  confirmDelete(event: Event, index: number): void {
    event.stopPropagation();
    this.appointmentToDelete = this.appointments[index].id;
    this.showConfirmModal = true;
  }

  deleteAppointment(): void {
    if (this.appointmentToDelete !== null) {
      this.appointmentService.deleteAppointment(this.appointmentToDelete);
      this.appointmentToDelete = null;
      this.showConfirmModal = false;
      this.loadAppointments();
    }
  }

  toggleConfirmModal(): void {
    this.showConfirmModal = !this.showConfirmModal;
  }

  resetForm(): void {
    this.currentAppointment = {id: 0, patientId: '', doctorPwz: '', roomNumber: '', date: '', time: ''};
    this.isEditMode = false;
  }
}
