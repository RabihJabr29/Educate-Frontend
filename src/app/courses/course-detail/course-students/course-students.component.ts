import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Assignment } from 'src/app/models/assignment.model';
import { Student } from 'src/app/models/student.model';
import { CoursesService } from '../../courses.service';

import { StudentGradesModalConfig } from './student-grades/student-grades-modal.config';
import { StudentGradesComponent } from './student-grades/student-grades.component';
import { StudentsService } from './students.service';

@Component({
  selector: 'app-course-students',
  templateUrl: './course-students.component.html',
  styleUrls: ['./course-students.component.css']
})
export class CourseStudentsComponent implements OnInit {

  constructor(private studentsService: StudentsService, private coursesService: CoursesService, private authService: AuthService) { }

  currentStudent: Student;
  currentAssignment: Assignment;

  students: Student[] = [];
  userType: string;

  async ngOnInit() {
    this.userType = this.authService.getUserType();
    let sectionId: string = this.coursesService.currentSection;
    this.students = await this.studentsService.getStudents(sectionId);
  }


  @ViewChild('Modal') private modalComponent: StudentGradesComponent;

  public modalConfig: StudentGradesModalConfig = {
    modalTitle: "Student Grades",
    onClose: () => {
      return true
    },
    closeButtonLabel: "Close",
  }

  async openModal() {
    return await this.modalComponent.open();
  }

  onClickStudent() {
    while (this.studentsService.currentStudent == undefined);
    this.openModal();
  }

  onClickAddNewStudent() {
    // I to be
  }

}

