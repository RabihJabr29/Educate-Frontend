import { Component, OnInit, ViewChild, Input, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { AnnouncementCreateNewComponent } from 'src/app/announcements/announcement-create-new/announcement-create-new.component';
import { CreateAnnouncementModalConfig } from 'src/app/announcements/announcement-create-new/announcement-modal.config';
import { AssignmentCreateNewComponent } from 'src/app/assignments/assignment-create-new/assignment-create-new.component';
import { ModalConfig } from 'src/app/assignments/assignment-create-new/modal.config';
import { AssignmentsService } from 'src/app/assignments/assignments.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Assignment } from 'src/app/models/assignment.model';
import { Course } from 'src/app/models/course.model';
import { Section } from 'src/app/models/section.model';
import { CoursesService } from '../courses.service';
import { CreateUploadModalConfig } from './create-upload/create-upload-modal.config';
import { CreateUploadComponent } from './create-upload/create-upload.component';

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
  currentSectionId: string;
  activeNavItem: string = "course-content";

  async ngOnInit() {
    this.currentSectionId = localStorage.getItem("currentSection");
    this.activeNavItem = localStorage.getItem("activeNavItem");
    this.coursesService.currentSection = this.currentSectionId;
    await this.coursesService.getCourseByIdFromServer(this.currentSectionId);
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
    localStorage.setItem('activeNavItem', this.activeNavItem);
    this.router.navigateByUrl("courses/course-detail/course-content");
  }

  onClickNavItemStudents() {
    this.activeNavItem = "students";
    localStorage.setItem('activeNavItem', this.activeNavItem);
    this.router.navigateByUrl("courses/course-detail/course-students");
  }

  onClickNavItemAssignments() {
    this.activeNavItem = "assignments";
    localStorage.setItem('activeNavItem', this.activeNavItem);
    this.router.navigateByUrl("courses/course-detail/course-assignments");
  }

  onClickNavItemAnnouncements() {
    this.activeNavItem = "announcements";
    localStorage.setItem('activeNavItem', this.activeNavItem);
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
      return;
    } else if (this.activeNavItem == 'announcements') {
      this.openCreateAnnouncementModal();
    }
  }

  onClickEditMode() {
    this.coursesService.courseContentEditMode = !this.coursesService.courseContentEditMode;
    this.coursesService.editModeEventEmitter.emit(this.coursesService.courseContentEditMode);
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

  onClickCreateFolder() {
    this.createUploadModalConfig.modalTitle = "Create a New Folder";
    this.createUploadModalConfig.createButtonLabel = "Create";

    this.openUploadCreateModal();
  }

  onClickUploadFile() {
    this.createUploadModalConfig.modalTitle = "Upload a File";
    this.createUploadModalConfig.createButtonLabel = "Upload";

    this.openUploadCreateModal();
  }

  @ViewChild('createUploadModal') private createUploadModalComponent: CreateUploadComponent

  public createUploadModalConfig: CreateUploadModalConfig = {
    modalTitle: "New Assignment",
    onClose: () => {
      return true
    },
    closeButtonLabel: "Close",
    onCreate: () => {
      return true;
    },
  }

  async openUploadCreateModal() {
    return await this.createUploadModalComponent.open()
  }

  @ViewChild('createAnnouncementModal') private createAnnouncementModalComponent: AnnouncementCreateNewComponent

  public createAnnouncementModalConfig: CreateAnnouncementModalConfig = {
    modalTitle: "New Announcement",
    onClose: () => {
      return true
    },
    closeButtonLabel: "Close",
    onCreate: () => {
      return true;
    },
  }

  async openCreateAnnouncementModal() {
    return await this.createAnnouncementModalComponent.open()
  }

}
