import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {AppComponent} from './app.component';
import {PatientsComponent} from './patients/patients.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule} from "@angular/forms";
import {HomeComponent} from "./home/home.component";
import {RouterModule} from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {RoomsComponent} from "./rooms/rooms.component";
import {DoctorsComponent} from "./doctors/doctors.component";
import {AppointmentsComponent} from "./appointments/appointments.component";
import {AppointmentService} from "./service/appointment/appointment.service";
import {DoctorService} from "./service/doctor/doctor.service";
import {RoomService} from "./service/room/room.service";

@NgModule({
  declarations: [
    AppComponent,
    PatientsComponent,
    HomeComponent,
    LayoutComponent,
    SidebarComponent,
    RoomsComponent,
    DoctorsComponent,
    AppointmentsComponent
    // other components
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [AppointmentService, DoctorService, RoomService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
