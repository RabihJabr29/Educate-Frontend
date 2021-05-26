import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Assignment } from '../models/assignment.model';
import { AssignmentsService } from './assignments.service';


@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {

  constructor(private assignmentsService: AssignmentsService) { }
  assignments: Assignment[] = [];

  async ngOnInit() {
    this.assignments = await this.assignmentsService.getAllAssignments();
    console.log(this.assignments);
  }
}
