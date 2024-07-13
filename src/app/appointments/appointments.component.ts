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

  availableTimes: string[] = [];

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
    if (this.validateAppointment()) {
      this.appointmentService.addAppointment(this.currentAppointment);
      this.showModal = false;
      this.loadAppointments();
    } else {
      alert('Selected time is not available or outside of working hours.');
    }
  }

  editAppointment(index: number) {
    this.isEditMode = true;
    this.currentIndex = index;
    this.currentAppointment = {...this.appointments[index]};
    this.showModal = true;
  }

  updateAppointment() {
    if (this.validateAppointment()) {
      if (this.currentIndex !== null) {
        this.appointmentService.updateAppointment(this.currentAppointment);
        this.showModal = false;
        this.loadAppointments();
      }
    } else {
      alert('Selected time is not available or outside of working hours.');
    }
  }

  confirmDelete(event: Event, index: number) {
    console.log(index)
    console.log(this.appointments)
    event.stopPropagation();
    this.currentIndex = index;
    this.showConfirmModal = true;
  }

  deleteAppointment() {
    if (this.currentIndex !== null) {
      this.appointmentService.deleteAppointment(this.currentIndex);
      this.showConfirmModal = false;
      this.loadAppointments();
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

  validateAppointment(): boolean {
    const doctor = this.doctors.find(d => d.pwz === this.currentAppointment.doctorPwz);
    if (!doctor) return false;

    const appointmentDate = new Date(this.currentAppointment.date);
    const appointmentTime = this.currentAppointment.time;

    const workingHours = doctor.workingHours.find(wh => wh.day === this.getDayOfWeek(appointmentDate));
    if (!workingHours) return false;

    const startTime = new Date(`1970-01-01T${workingHours.start}`);
    const endTime = new Date(`1970-01-01T${workingHours.end}`);
    const appointmentDateTime = new Date(`1970-01-01T${appointmentTime}`);

    if (appointmentDateTime < startTime || appointmentDateTime > endTime) {
      return false;
    }

    const existingAppointments = this.appointments.filter(
      a =>
        a.doctorPwz === this.currentAppointment.doctorPwz &&
        a.date === this.currentAppointment.date &&
        a.time === this.currentAppointment.time &&
        a.id !== this.currentAppointment.id
    );

    return existingAppointments.length <= 0;
  }

  private getDayOfWeek(date: Date): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  }

  generateAvailableTimes(): void {
    this.availableTimes = [];

    const doctor = this.doctors.find(d => d.pwz === this.currentAppointment.doctorPwz);
    if (!doctor) return;

    const workingHours = doctor.workingHours.find(wh => wh.day === this.getDayOfWeek(new Date(this.currentAppointment.date)));
    if (!workingHours) return;

    const startTime = new Date(`1970-01-01T${workingHours.start}`);
    const endTime = new Date(`1970-01-01T${workingHours.end}`);

    let currentTime = new Date(startTime);

    while (currentTime <= endTime) {
      const formattedTime = currentTime.toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit'});
      this.availableTimes.push(formattedTime);
      currentTime.setMinutes(currentTime.getMinutes() + 30)
    }
  }
}
