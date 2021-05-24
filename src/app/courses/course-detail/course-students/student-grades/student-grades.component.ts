import { Component, Injectable, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
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

}
