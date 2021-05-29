import { Component, OnInit, ViewChild, Input, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentCreateNewComponent } from 'src/app/assignments/assignment-create-new/assignment-create-new.component';
import { ModalConfig } from 'src/app/assignments/assignment-create-new/modal.config';
import { AssignmentsService } from 'src/app/assignments/assignments.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Assignment } from 'src/app/models/assignment.model';
import { Course } from 'src/app/models/course.model';
import { Section } from 'src/app/models/section.model';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  userType: string;
  constructor(private router: Router, private coursesService: CoursesService, private authService: AuthService, private assignmentsService: AssignmentsService) { }

  currentSection: Section;
  currentCourse: Course;

  activeNavItem: string = "course-content";

  async ngOnInit() {
    await this.coursesService.getCourseByIdFromServer(this.coursesService.currentSection);
    this.currentSection = this.coursesService.currentSectionObject;
    let section_course: Course = this.currentSection.course;
    this.currentCourse = {
      id: section_course.id,
      name: section_course.name,
      code: section_course.code,
      description: section_course.description,
      credits: section_course.credits,
      department: section_course.department,
    }
    this.userType = this.authService.getUserType();
    this.assignmentsService.editEventEmitter.subscribe((assignement: Assignment) => {
      this.openModal();
    });
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

  onClickNavItemAnnouncements() {
    this.activeNavItem = "announcements";
    this.router.navigateByUrl("courses/course-detail/course-announcements");
  }

  onClickBackArrow() {
    this.router.navigateByUrl("courses");
  }

  // assignment create new modal


  onClickAdd() {
    if (this.activeNavItem == 'assignments')
      this.openModal();
    else if (this.activeNavItem == 'course-content') {

    } else if (this.activeNavItem == 'announcements') {

    }
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
