import { Component, Injectable, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Assignment } from 'src/app/models/assignment.model';
import { AssignmentsService } from '../assignments.service';
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
  createEditButtonLabel: string = "Create";
  model;


  constructor(private modalService: NgbModal, private assignmentsService: AssignmentsService, private router: Router) {
  }

  today: string;

  ngOnInit(): void {
    this.today = new Date().toISOString().slice(0, 10);

  }

  currentAssignmentId: string;

  open(): Promise<boolean> {
    let editAssigenment: Assignment = this.assignmentsService.assignementEdit;
    console.log(editAssigenment)

    if (editAssigenment) {

      this.createEditButtonLabel = "Save";
      this.currentAssignmentId = editAssigenment._id;
      this.typeInput = editAssigenment.type;
      this.percentageInput = editAssigenment.gradePercentage;
      this.titleInput = editAssigenment.name;
      this.descriptionInput = editAssigenment.description;
      this.maxGradeInput = editAssigenment.maxGrade;
      this.startDateInput = editAssigenment.startDate;
      this.startTimeInput = editAssigenment.startTime;
      this.endDateInput = editAssigenment.endDate;
      this.endTimeInput = editAssigenment.endTime;
      this.allowLateSubmissions = editAssigenment.allowLateSubmissions;
      this.allowMultipleSubmissions = editAssigenment.allowMultipleSubmissions;
    }

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

  typeInput: string;
  percentageInput: number;
  titleInput: string;
  descriptionInput: string;
  maxGradeInput: number;
  startDateInput: string;
  startTimeInput: string;
  endDateInput: string;
  endTimeInput: string;
  allowLateSubmissions: boolean = false;
  allowMultipleSubmissions: boolean = false;

  onChangePercentage() {
    if (this.percentageInput < 1) {
      this.percentageInput = 1;
      this.percentageValid = false;
    }
    else if (this.percentageInput > 100) {
      this.percentageInput = 100;
      this.percentageValid = false;
    }
    else this.percentageValid = true;
  }

  typeValid: boolean = true;
  titleValid: boolean = true;
  descriptionValid: boolean = true;
  maxGradeValid: boolean = true;
  percentageValid: boolean = true;
  startDateValid: boolean = true;
  startTimeValid: boolean = true;
  endDateValid: boolean = true;
  endTimeValid: boolean = true;


  async create() {

    if (this.typeInput == null) {
      this.typeValid = false;
    } else this.typeValid = true;
    if (this.titleInput == null || this.titleInput.length < 4) {
      this.titleValid = false;
    } else this.titleValid = true;
    if (this.descriptionInput == null || this.descriptionInput.length == 0) {
      this.descriptionValid = false;
    } else this.descriptionValid = true;
    if (this.maxGradeInput == null || this.maxGradeInput <= 0) {
      this.maxGradeValid = false;
    } else this.maxGradeValid = true;
    if (this.percentageInput == null) {
      this.percentageValid = false;
    }
    if (this.startDateInput == null) {
      this.startDateValid = false;
    } else this.startDateValid = true;

    if (this.startTimeInput == null) {
      this.startTimeValid = false;
    } else this.startTimeValid = true;

    if (this.endDateInput == null) {
      this.endDateValid = false;
    } else this.endDateValid = true;

    if (this.endTimeInput == null) {
      this.endTimeValid = false;
    } else this.endTimeValid = true;

    let assignment: Assignment = {
      name: this.titleInput,
      description: this.descriptionInput,
      type: this.typeInput,
      maxGrade: this.maxGradeInput,
      gradePercentage: this.percentageInput,
      isVisible: true,
      visibility: "automatic",
      startDate: this.startDateInput,
      startTime: this.startTimeInput,
      endDate: this.endDateInput,
      endTime: this.endTimeInput,
      allowLateSubmissions: this.allowLateSubmissions,
      allowMultipleSubmissions: this.allowMultipleSubmissions,
    }
    if (this.createEditButtonLabel == "Save") {
      assignment = {
        _id: this.currentAssignmentId,
        name: this.titleInput,
        description: this.descriptionInput,
        type: this.typeInput,
        maxGrade: this.maxGradeInput,
        gradePercentage: this.percentageInput,
        isVisible: true,
        visibility: "automatic",
        startDate: this.startDateInput,
        startTime: this.startTimeInput,
        endDate: this.endDateInput,
        endTime: this.endTimeInput,
        allowLateSubmissions: this.allowLateSubmissions,
        allowMultipleSubmissions: this.allowMultipleSubmissions,
      }
      this.assignmentsService.editAssignment(assignment);
      return;
    }
    await this.assignmentsService.createAssignment(assignment);
    this.typeInput = null;
    this.titleInput = null;
    this.descriptionInput = null;
    this.startDateInput = null;
    this.startTimeInput = null;
    this.endDateInput = null;
    this.endTimeInput = null;
    this.maxGradeInput = null;
    this.percentageInput = null;
    this.allowLateSubmissions = false;
    this.allowMultipleSubmissions = false;
    this.close();
  }
}
