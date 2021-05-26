import { Component, OnInit, ViewChild } from '@angular/core';

import { StudentGradesModalConfig } from './student-grades/student-grades-modal.config';
import { StudentGradesComponent } from './student-grades/student-grades.component';

@Component({
  selector: 'app-course-students',
  templateUrl: './course-students.component.html',
  styleUrls: ['./course-students.component.css']
})
export class CourseStudentsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  @ViewChild('Modal') private modalComponent: StudentGradesComponent

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
    this.openModal();
  }

  onClickAddNewStudent() {
    // I to be
  }

}

