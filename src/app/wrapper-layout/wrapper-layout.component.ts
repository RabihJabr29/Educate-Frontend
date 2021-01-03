import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-wrapper-layout',
  templateUrl: './wrapper-layout.component.html',
  styleUrls: ['./wrapper-layout.component.css']
})
export class WrapperLayoutComponent implements OnInit {

  toggled: string = "";
  active: string = "dashboard";
  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu(e: Event) {
    e.preventDefault();
    if (this.toggled == "")
      this.toggled = "toggled";
    else this.toggled = "";
  }


  onClickListItemDashboard() {
    this.active = 'dashboard';
  }
  onClickListItemCourses() {
    this.active = 'courses';
  }
  onClickListItemAssignments() {
    this.active = 'assignments';
  }

  onClickListItemCalendar() {
    this.active = 'calendar';
  }


}
