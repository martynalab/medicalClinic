import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { AppComponent } from './app.component';
import { PatientsComponent } from './patients/patients.component';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from "@angular/forms";
import {HomeComponent} from "./home/home.component";
import { RouterModule } from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {RoomsComponent} from "./rooms/rooms.component";
import {DoctorsComponent} from "./doctors/doctors.component";

@NgModule({
  declarations: [
    AppComponent,
    PatientsComponent,
    HomeComponent,
    LayoutComponent,
    SidebarComponent,
    RoomsComponent,
    DoctorsComponent
    // other components
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule, // Import CommonModule
    AppRoutingModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
