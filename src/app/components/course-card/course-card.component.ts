import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnInit {
  courseCode: String = "CSC490";
  courseName: String = "Web Programming";
  courseParticipantsNumber: Number = 21;
  courseWeeklySchedule = "MWF: 02:00 PM - 02:50 PM";

  constructor() { }

  ngOnInit(): void {
  }

  onClickCourseCard() {
    console.log("Hello from course card");
  }
}
