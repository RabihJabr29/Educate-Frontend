import { Component, Injectable, Input, OnInit, ViewChild, TemplateRef } from '@angular/core';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Submission } from 'src/app/models/submission.model';
import { Student } from 'src/app/models/student.model';
import { AssignmentDetailsModalConfig } from './assignment-details-modal.config';
import { StudentsService } from 'src/app/courses/course-detail/course-students/students.service';
import { CoursesService } from 'src/app/courses/courses.service';
import { Course } from 'src/app/models/course.model';
import { Assignment } from 'src/app/models/assignment.model';
import { AssignmentsService } from '../assignments.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-assignment-details',
  templateUrl: './assignment-details.component.html',
  styleUrls: ['./assignment-details.component.css']
})
export class AssignmentDetailsComponent implements OnInit {
  @Input() public modalConfig: AssignmentDetailsModalConfig;
  @ViewChild('assignmentDetailsModal') private modalContent: TemplateRef<AssignmentDetailsComponent>;
  private modalRef: NgbModalRef;
  model;

  textSubmissionInput: string;

  @Input() assignment: Assignment;
  assignmentSubmission: Submission;
  submitted: string;
  constructor(private modalService: NgbModal, private studentsService: StudentsService, private authService: AuthService, private assignmentsService: AssignmentsService) { }

  async ngOnInit() {

  }

  submissionGrade: string | number;
  submitDisabled: boolean = false;

  async open(): Promise<boolean> {
    this.assignmentsService.selectedAssignment;
    await this.studentsService.getStudentSubmissionByAssignmentID(this.authService.getUserId(), this.assignment.assignment_id);
    this.assignmentSubmission = this.studentsService.assignmentSubmission;
    if (this.assignmentSubmission == undefined) {
      this.submitted = "Not submitted";
      this.submissionGrade = "Pending";
    } else {
      this.submitted = "Submitted";
      this.submissionGrade = this.assignmentSubmission.grade;
      this.textSubmissionInput = this.assignmentSubmission.textSubmission;
      this.filesToUpload = this.assignmentSubmission.files;
      if ((this.assignmentSubmission && !this.assignment.allowMultipleSubmissions) || !this.assignment.isActive) {
        this.submitDisabled = true;
      } else this.submitDisabled = false;
    }
    console.log(this.assignment);
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

  submit() {
    if (!confirm("Are you sure you want to submit again. Your new submission will override the previous one.")) {
      return;
    }
    let data = {
      student_id: this.authService.getUserId(),
      assignment_id: this.assignment.assignment_id,
      textSubmission: this.textSubmissionInput,

    };

    let formData = new FormData();
    for (let prop in data) {
      formData.append(prop, data[prop]);
    }
    this.filesToUpload.forEach(file => {
      formData.append('files', file);
    });
    if (this.textSubmissionInput != null) {
      this.studentsService.submitAssignment(formData);
      this.close();
    }

  }

  filesToUpload: File[] = [];
  filesUploadValid: boolean = true;

  handleFileInput(files: FileList) {
    let i;
    for (i = 0; i < files.length; i++) {
      this.filesToUpload.push(files.item(i));
    }
  }

  onClickAttachedFile(file) {
    let blob = new Blob([new Uint8Array(file.data.data)], {
      type: file.type
    });
    let link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = file.name;
    link.click();
    link.remove();
  }

}
