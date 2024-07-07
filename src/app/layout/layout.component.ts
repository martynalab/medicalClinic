import { Component } from '@angular/core';
import {RouterModule} from "@angular/router";
import {SidebarComponent} from "../sidebar/sidebar.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, SidebarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
