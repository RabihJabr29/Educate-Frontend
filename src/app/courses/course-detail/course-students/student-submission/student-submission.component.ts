import { Component, Injectable, Input, OnInit, ViewChild, TemplateRef } from '@angular/core';

import { StudentSubmissionModalConfig } from './student-submission-modal.config';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Submission } from 'src/app/models/submission.model';
import { Assignment } from 'src/app/models/assignment.model';
import { Student } from 'src/app/models/student.model';
import { StudentsService } from '../students.service';
import { AuthService } from 'src/app/auth/auth.service';
import { CoursesService } from 'src/app/courses/courses.service';

@Component({
  selector: 'app-student-submission',
  templateUrl: './student-submission.component.html',
  styleUrls: ['./student-submission.component.css']
})
@Injectable()
export class StudentSubmissionComponent implements OnInit {
  @Input() public modalConfig: StudentSubmissionModalConfig;
  @ViewChild('studentSubmissionModal') private modalContent: TemplateRef<StudentSubmissionComponent>;
  private modalRef: NgbModalRef;

  model;

  submission: Submission;
  assignment: Assignment;
  student: Student;
  submissionStatus: string;

  constructor(private modalService: NgbModal, private studentsService: StudentsService, private authService: AuthService, private coursesServices: CoursesService) { }

  ngOnInit(): void { }


  open(): Promise<boolean> {
    this.student = this.studentsService.currentStudent;
    this.submission = this.studentsService.currentSubmission;
    this.assignment = this.submission.assignment;
    this.submissionStatus = this.submission.isGraded ? "Graded" : "Submitted";
    this.gradeInput = this.submission.grade;
    this.commentsInput = this.submission.comments;
    console.log(this.submission)
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

  gradeInput: number;
  commentsInput: string;
  gradeValid: boolean = true;

  onChangeGrade(event: Event) {
    let value = parseInt((event.target as HTMLInputElement).value);

    if (value > this.assignment.maxGrade) {
      this.gradeInput = this.assignment.maxGrade;
      (event.target as HTMLInputElement).value = this.assignment.maxGrade + "";
    }
    if (value < 0) {
      this.gradeInput = 0;
      (event.target as HTMLInputElement).value = "0";
    }
  }

  save() {
    // save notes + grade
    if (this.gradeInput == null) this.gradeValid = false;
    console.log(this.submission._id);
    this.studentsService.gradeAssignment(this.submission._id, this.gradeInput, this.commentsInput);
    this.studentsService.getSubmissionsByStudentIdFromServer(this.authService.getUserId(), this.coursesServices.currentSection);
    this.close();
  }

}

