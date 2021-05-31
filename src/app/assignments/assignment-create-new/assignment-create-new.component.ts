import { Component, Injectable, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { isInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { CoursesService } from 'src/app/courses/courses.service';
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


  constructor(private modalService: NgbModal, private assignmentsService: AssignmentsService, private coursesService: CoursesService) {
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
      this.currentAssignmentId = editAssigenment.assignment_id;
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

		if(!this.modalService.hasOpenModals()){
    return new Promise<boolean>(resolve => {
      this.modalRef = this.modalService.open(this.modalContent, { size: 'lg', backdrop: 'static' })
      this.modalRef.result.then(resolve, resolve)
    })
	}
		return new Promise<boolean>(resolve => false);
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
      return;
    } else this.typeValid = true;
    if (this.titleInput == null || this.titleInput.length < 4) {
      this.titleValid = false;
      return;
    } else this.titleValid = true;
    if (this.descriptionInput == null || this.descriptionInput.length == 0) {
      this.descriptionValid = false;
      return;
    } else this.descriptionValid = true;
    if (this.maxGradeInput == null || this.maxGradeInput <= 0) {
      this.maxGradeValid = false;
      return;
    } else this.maxGradeValid = true;
    if (this.percentageInput == null) {
      this.percentageValid = false;
      return;
    }
    if (this.startDateInput == null) {
      this.startDateValid = false;
      return;
    } else this.startDateValid = true;

    if (this.startTimeInput == null) {
      this.startTimeValid = false;
      return;
    } else this.startTimeValid = true;

    if (this.endDateInput == null) {
      this.endDateValid = false;
      return;
    } else this.endDateValid = true;

    if (this.endTimeInput == null) {
      this.endTimeValid = false;
      return;
    } else this.endTimeValid = true;

    let startDate = this.startDateInput.split("-");
    let endDate = this.endDateInput.split("-");
    let startdateFormatted = startDate[2] + '/' + startDate[1] + '/' + startDate[0];
    let enddateFormatted = endDate[2] + '/' + endDate[1] + '/' + endDate[0];

    let startTime = this.startTimeInput.split(":");
    if (parseInt(startTime[0]) >= 12) {
      this.startTimeInput += " PM";
    } else if (parseInt(startTime[0]) < 12) {
      if (parseInt(startTime[0]) == 0) {
        this.startTimeInput = "12:" + startTime[1];
      }
      this.startTimeInput += " AM";
    }

    let endTime = this.endTimeInput.split(":");
    if (parseInt(endTime[0]) >= 12) {
      this.endTimeInput += " PM";
    } else if (parseInt(endTime[0]) < 12) {
      if (parseInt(endTime[0]) == 0) {
        this.endTimeInput = "12:" + endTime[1];
      }
      this.endTimeInput += " AM";
    }

    let section_id = this.coursesService.currentSection;
    let assignment: Assignment = {
      name: this.titleInput,
      section: section_id,
      description: this.descriptionInput,
      type: this.typeInput,
      maxGrade: this.maxGradeInput,
      gradePercentage: this.percentageInput,
      isVisible: true,
      visibility: "automatic",
      startDate: startdateFormatted,
      startTime: this.startTimeInput,
      endDate: enddateFormatted,
      endTime: this.endTimeInput,
      allowLateSubmissions: this.allowLateSubmissions,
      allowMultipleSubmissions: this.allowMultipleSubmissions,
      files: []
    }
    if (this.createEditButtonLabel == "Save") {
      assignment = {
        assignment_id: this.currentAssignmentId,
        name: this.titleInput,
        section: section_id,
        description: this.descriptionInput,
        type: this.typeInput,
        maxGrade: this.maxGradeInput,
        gradePercentage: this.percentageInput,
        isVisible: true,
        visibility: "automatic",
        startDate: startdateFormatted,
        startTime: this.startTimeInput,
        endDate: enddateFormatted,
        endTime: this.endTimeInput,
        allowLateSubmissions: this.allowLateSubmissions,
        allowMultipleSubmissions: this.allowMultipleSubmissions,
        files: []
      }
      let formData = new FormData();
      for (let prop in assignment) {
				if(!assignment[prop])
						return;
        formData.append(prop, assignment[prop]);
      }
      this.filesToUpload.forEach(file => {
        formData.append('files', file);
      });
      this.assignmentsService.editAssignment(formData);
      return;
    }
    let formData = new FormData();
    for (let prop in assignment) {
			if(!assignment[prop])
				return;
      formData.append(prop, assignment[prop]);
    }
    this.filesToUpload.forEach(file => {
      formData.append('files', file);
    });
    await this.assignmentsService.createAssignment(formData);
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
    this.filesToUpload = null;
    this.close();
  }

  filesToUpload: File[] = [];
  filesUploadValid: boolean = true;

  handleFileInput(files: FileList) {
    let i;
    for (i = 0; i < files.length; i++) {
      this.filesToUpload.push(files.item(i));
    }
  }
}
