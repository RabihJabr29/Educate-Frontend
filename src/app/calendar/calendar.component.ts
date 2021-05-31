import { Component, OnInit, ViewChild } from '@angular/core';

import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular'; // useful for typechecking
import { AssignmentsService } from '../assignments/assignments.service';
import { Assignment } from '../models/assignment.model';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    
  };

  @ViewChild('calendar') calendar: FullCalendarComponent;

  handleDateClick(arg) {
    // console.log("hello");
    // alert('date click! ' + arg.dateStr)
  }

  constructor(private assignmentsService: AssignmentsService) { }
  assignments: Assignment[] = [];
  async ngOnInit() {
    if (this.assignmentsService.allAssignments == null) {
      this.assignments = await this.assignmentsService.getAllAssignments();
    } else {
      if (this.assignmentsService.allAssignments.length == 0) {
        this.assignments = await this.assignmentsService.getAllAssignments();
      } else {
        this.assignments = this.assignmentsService.getAllAssignmentsCopy();
      }
    }

    try {
      this.assignments.forEach(a => {
        let startdate = a.startDate.split('/');
        let startdateformatted = startdate[2] + '-' + startdate[1] + '-' + startdate[0];
        let enddate = a.endDate.split('/');
        let enddateformatted = enddate[2] + '-' + enddate[1] + '-' + enddate[0];
        this.calendar.getApi().addEvent({ "title": a.name, "start": startdateformatted, "end": enddateformatted, 'backgroundColor': 'rgb(81, 159, 255)' })
      });
    } catch (err) { }
  }

  ngAfterViewInit() {
    this.assignments.forEach(a => {
      let startdate = a.startDate.split('/');
      let startdateformatted = startdate[2] + '-' + startdate[1] + '-' + startdate[0];
      let enddate = a.endDate.split('/');
      let enddateformatted = enddate[2] + '-' + enddate[1] + '-' + enddate[0];
      this.calendar.getApi().addEvent({ "title": a.name, "start": startdateformatted, "end": enddateformatted, 'backgroundColor': 'rgb(81, 159, 255)' })
    });
  }
}
