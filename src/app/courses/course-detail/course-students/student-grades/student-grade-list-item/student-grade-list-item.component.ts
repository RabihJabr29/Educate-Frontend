import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-grade-list-item',
  templateUrl: './student-grade-list-item.component.html',
  styleUrls: ['./student-grade-list-item.component.css']
})
export class StudentGradeListItemComponent implements OnInit {

  assignment = {
    title: "Calculus exam 1",
    type: "Exam",
    date: "13/01/2020",
    time: "10:00 AM",
    status: "graded",
    maxGrade: 100,
    studentGrade: 85
  }

  constructor() { }

  ngOnInit(): void {
  }


}
