import { Component, Injectable, Input, OnInit, ViewChild, TemplateRef } from '@angular/core';

import { StudentSubmissionModalConfig } from './student-submission-modal.config';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

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

  student = {
    name: "Jeffrey Joumjian",
    major: "Computer Science",
    email: "jeffrey.joumjian@lau.edu"
  }

  assignment = {
    title: "Web Programming",
    type: "Assignment",
    grade: 0,
    maxGrade: 25,
    dueDate: "08/01/2020 11:59 PM",
    status: "closed"
  }

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void { }


  open(): Promise<boolean> {
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

  save() {
    // save notes + grade
  }
}
