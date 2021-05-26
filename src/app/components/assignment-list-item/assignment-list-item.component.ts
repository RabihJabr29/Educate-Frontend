import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assignment-list-item',
  templateUrl: './assignment-list-item.component.html',
  styleUrls: ['./assignment-list-item.component.css']
})
export class AssignmentListItemComponent implements OnInit {

  assignment = {
    title: "Web Programming",
    type: "Assignment",
    grade: 0,
    totalGrade: 25,
    dueDate: "08/01/2020 11:59 PM",
    status: "closed"
  }
  constructor() { }

  ngOnInit(): void {
  }

  onClickEditAssignment() {
    // to be implemented

  }

  onClickDeleteAssignment() {

  }
}
