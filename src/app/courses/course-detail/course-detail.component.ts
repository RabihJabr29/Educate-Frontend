import { Component, OnInit, ViewChild, Input, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentCreateNewComponent } from 'src/app/assignments/assignment-create-new/assignment-create-new.component';
import { ModalConfig } from 'src/app/assignments/assignment-create-new/modal.config';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  constructor(private router: Router) { }

  activeNavItem: string = "course-content";

  ngOnInit(): void {
  }

  onClickNavItemCourseContent() {
    this.activeNavItem = "course-content";
    this.router.navigateByUrl("courses/course-detail/course-content");
  }

  onClickNavItemStudents() {
    this.activeNavItem = "students";
    this.router.navigateByUrl("courses/course-detail/course-students");
  }

  onClickNavItemAssignments() {
    this.activeNavItem = "assignments";
    this.router.navigateByUrl("courses/course-detail/course-assignments");
  }

  onClickBackArrow() {
    this.router.navigateByUrl("courses");
  }

  // assignment create new modal


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
