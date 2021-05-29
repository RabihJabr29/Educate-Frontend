import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/courses/courses.service';
import { Course } from 'src/app/models/course.model';
import { Section } from 'src/app/models/section.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnInit {
  @Input() section: Section;
  course: Course;
  constructor(private router: Router, private coursesService: CoursesService) { }

  ngOnInit(): void {
    let section_course: Course = this.section.course;
    this.course = {
      id: section_course.id,
      name: section_course.name,
      code: section_course.code,
      description: section_course.description,
      credits: section_course.credits,
      department: section_course.department,
    }
  }

  onClickCourseCard() {
    this.coursesService.currentSection = this.section._id;
    this.router.navigateByUrl("courses/course-detail")
  }
}
