import { Component, Input, OnInit } from '@angular/core';
import { Assignment } from 'src/app/models/assignment.model';

@Component({
  selector: 'app-assignment-list-item',
  templateUrl: './assignment-list-item.component.html',
  styleUrls: ['./assignment-list-item.component.css']
})
export class AssignmentListItemComponent implements OnInit {

  @Input() assignment: Assignment;
  constructor() { }

  assignmentStatus: string = "Open";

  ngOnInit(): void {
    if (this.assignment.isActive) {
      this.assignmentStatus = "Open";
    } else {
      this.assignmentStatus = "Closed";
    }
  }

  onClickEditAssignment() {
    // to be implemented

  }

  onClickDeleteAssignment() {

  }
}
