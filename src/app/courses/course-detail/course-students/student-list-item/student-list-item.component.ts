import { Component, Inject, Input, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/courses/courses.service';
import { Student } from 'src/app/models/student.model';
import { Submission } from 'src/app/models/submission.model';
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-student-list-item',
  templateUrl: './student-list-item.component.html',
  styleUrls: ['./student-list-item.component.css']
})
export class StudentListItemComponent implements OnInit {
  @Input() student: Student;

  constructor(private studentsService: StudentsService, private coursesService: CoursesService) { }

  ngOnInit(): void {

  }

  onClickStudent() {
    this.studentsService.setCurrentStudent(this.student);
  }
}
