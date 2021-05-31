import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnnouncementsService } from '../announcements/announcements.service';
import { AssignmentsService } from '../assignments/assignments.service';
import { CoursesService } from '../courses/courses.service';
import { Announcement } from '../models/announcement.model';
import { Assignment } from '../models/assignment.model';
import { Section } from '../models/section.model';
import { WrapperService } from '../wrapper-layout/wrapper.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router,
    private wrapperService: WrapperService,
    private coursesService: CoursesService,
    private assignmentsService: AssignmentsService,
    private announcementsService: AnnouncementsService) { }

  sections: Section[] = [];
  assignments: Assignment[] = [];
  announcements: Announcement[] = [];

  async ngOnInit() {
    this.sections = await this.coursesService.getCourses();
    this.assignments = await this.assignmentsService.getAllAssignments();
    this.announcements = await this.announcementsService.getAllAnnouncements();
  }

  onClickViewCourses() {
    this.router.navigateByUrl("/courses");
    this.wrapperService.navigateTo("courses");
  }

  onClickViewAssignments() {
    this.router.navigateByUrl("/assignments");
    this.wrapperService.navigateTo("assignments");
  }
}
