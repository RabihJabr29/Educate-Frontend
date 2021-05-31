import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentDetailsModalConfig } from 'src/app/assignments/assignment-details/assignment-details-modal.config';
import { AssignmentDetailsComponent } from 'src/app/assignments/assignment-details/assignment-details.component';
import { AssignmentsService } from 'src/app/assignments/assignments.service';
import { AuthService } from 'src/app/auth/auth.service';
import { CourseDetailComponent } from 'src/app/courses/course-detail/course-detail.component';
import { CoursesService } from 'src/app/courses/courses.service';
import { Assignment } from 'src/app/models/assignment.model';

@Component({
  selector: 'app-assignment-list-item',
  templateUrl: './assignment-list-item.component.html',
  styleUrls: ['./assignment-list-item.component.css']
})
export class AssignmentListItemComponent implements OnInit {

  @Input() assignment: Assignment;
  constructor(private router: Router, private authService: AuthService, private assignmentsService: AssignmentsService, private coursesService: CoursesService) {
  }
  userType: string;
  assignmentStatus: string = "Open";

  ngOnInit(): void {
    if (this.assignment.isActive) {
      this.assignmentStatus = "Open";
    } else {
      this.assignmentStatus = "Closed";
    }
    this.userType = this.authService.getUserType();
  }

  onClickEditAssignment() {
    this.assignmentsService.assignementEdit = { ...this.assignment };
    this.assignmentsService.editEventEmitter.emit(this.assignment);
  }

  onClickDeleteAssignment() {
    if (confirm("Are you sure you want to delete this item")) {
      this.assignmentsService.deleteAssignment(this.assignment.assignment_id);
    }
  }

  onClickListItem() {
    if (this.authService.getUserType() == 'instructor') {
      this.onClickEditAssignment();
      return;
    }
    this.assignmentsService.selectedAssignment = { ...this.assignment };
    this.openModal();
    console.log("object");
  }

  @ViewChild('Modal') private modalComponent: AssignmentDetailsComponent;

  public modalConfig: AssignmentDetailsModalConfig = {
    modalTitle: "Assignment",
    onClose: () => {
      return true
    },
    closeButtonLabel: "Close",
  }

  async openModal() {
    return await this.modalComponent.open();
  }
}
