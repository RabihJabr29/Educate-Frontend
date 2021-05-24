import { Component, Injectable, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfig } from './modal.config';

@Component({
  selector: 'app-assignment-create-new',
  templateUrl: './assignment-create-new.component.html',
  styleUrls: ['./assignment-create-new.component.css']
})
@Injectable()
export class AssignmentCreateNewComponent implements OnInit {
  @Input() public modalConfig: ModalConfig;
  @ViewChild('modal') private modalContent: TemplateRef<AssignmentCreateNewComponent>;
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

  create() {

  }

  percentage: number;
  percentageValid: boolean = true;
  onChangePercentage() {
    if (this.percentage < 1) {
      this.percentage = 1;
      this.percentageValid = false;
    }
    else if (this.percentage > 100) {
      this.percentage = 100;
      this.percentageValid = false;
    }
    else this.percentageValid = true;
  }
}
