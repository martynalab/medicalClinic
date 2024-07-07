import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { AppComponent } from './app.component';
import { PatientsComponent } from './patients/patients.component';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from "@angular/forms";
import {HomeComponent} from "./home/home.component";

@NgModule({
  declarations: [
    AppComponent,
    PatientsComponent,
    HomeComponent
    // other components
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule, // Import CommonModule
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
