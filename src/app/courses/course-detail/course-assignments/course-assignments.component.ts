import { Component, OnInit, ViewChild } from '@angular/core';
import { AssignmentCreateNewComponent } from 'src/app/assignments/assignment-create-new/assignment-create-new.component';
import { ModalConfig } from 'src/app/assignments/assignment-create-new/modal.config';

@Component({
  selector: 'app-course-assignments',
  templateUrl: './course-assignments.component.html',
  styleUrls: ['./course-assignments.component.css']
})
export class CourseAssignmentsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  onClickAddAssignment() {
    this.openModal();
  }

  @ViewChild('modal') private modalComponent: AssignmentCreateNewComponent

  public modalConfig: ModalConfig = {
    modalTitle: "New Assignment",
    onClose: () => {
      return true
    },
    closeButtonLabel: "Close",
    onCreate: () => {
      return true;
    },
    createButtonLabel: "Create"
  }

  async openModal() {
    return await this.modalComponent.open()
  }

}
