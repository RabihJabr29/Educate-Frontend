import { Component, Injectable, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CoursesService } from 'src/app/courses/courses.service';
import { Student } from 'src/app/models/student.model';
import { Submission } from 'src/app/models/submission.model';
import { StudentSubmissionModalConfig } from '../student-submission/student-submission-modal.config';
import { StudentSubmissionComponent } from '../student-submission/student-submission.component';
import { StudentsService } from '../students.service';
import { StudentGradesModalConfig } from './student-grades-modal.config'


@Component({
  selector: 'app-student-grades',
  templateUrl: './student-grades.component.html',
  styleUrls: ['./student-grades.component.css']
})
@Injectable()
export class StudentGradesComponent implements OnInit {
  @Input() public modalConfig: StudentGradesModalConfig;
  @ViewChild('studentGradesModal') private modalContent: TemplateRef<StudentGradesComponent>;
  private modalRef: NgbModalRef;

  model;

  @Input() student: Student;

  studentSubmissions: Submission[] = [];

  constructor(private modalService: NgbModal, private studentsService: StudentsService, private coursesService: CoursesService) { }

  async ngOnInit() {
    
  }


  async open(): Promise<boolean> {
    let currentSectionId = this.coursesService.currentSection;
    this.student = this.studentsService.currentStudent;
    this.studentSubmissions = [];
    this.studentSubmissions = await this.studentsService.getSubmissionsByStudentId(this.student._id, currentSectionId);
    return new Promise<boolean>(resolve => {
      this.modalRef = this.modalService.open(this.modalContent, { size: 'lg', backdrop: 'static' })
      this.modalRef.result.then(resolve, resolve)
    })
  }

  async close(): Promise<void> {
    if (this.modalConfig.shouldClose === undefined || (await this.modalConfig.shouldClose())) {
      const result = this.modalConfig.onClose === undefined || (await this.modalConfig.onClose())
      this.modalRef.close(result)
    }
  }

  async dismiss(): Promise<void> {
    if (this.modalConfig.shouldDismiss === undefined || (await this.modalConfig.shouldDismiss())) {
      const result = this.modalConfig.onDismiss === undefined || (await this.modalConfig.onDismiss())
      this.modalRef.dismiss(result)
    }
  }


  // nested modal part

  @ViewChild('studentSubmissionModal') private studentSubmissionModalComponent: StudentSubmissionComponent

  public studentSubmissionModalConfig: StudentSubmissionModalConfig = {
    modalTitle: "Student Submission",
    onClose: () => {
      return true
    },
    closeButtonLabel: "Close",
    saveButtonLabel: "Save",
  }

  async openModal() {
    return await this.studentSubmissionModalComponent.open();
  }

  onClickGradeListItem() {
    this.openModal();
  }

}
