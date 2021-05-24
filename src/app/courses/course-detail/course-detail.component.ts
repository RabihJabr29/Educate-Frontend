import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  constructor(private router: Router) { }

  activeNavItem: string;

  ngOnInit(): void {
    this.activeNavItem = "course-content";
  }

  onClickNavItemCourseContent() {
    this.activeNavItem = "course-content";
    this.router.navigateByUrl("courses/course-detail/course-content");
  }

  onClickNavItemStudents() {
    this.activeNavItem = "students";
    this.router.navigateByUrl("courses/course-detail/course-students");
  }

  onClickNavItemAssignments() {
    this.activeNavItem = "assignments";
    this.router.navigateByUrl("courses/course-detail/course-assignments");
  }

  onClickBackArrow() {
    this.router.navigateByUrl("courses");
  }
}
