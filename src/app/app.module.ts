import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { AppComponent } from './app.component';
import { WrapperLayoutComponent } from './wrapper-layout/wrapper-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { AssignmentListItemComponent } from './components/assignment-list-item/assignment-list-item.component';
import { CoursesComponent } from './courses/courses.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AssignmentsComponent } from './assignments/assignments.component';
import { CourseDetailComponent } from './courses/course-detail/course-detail.component';
import { CourseContentComponent } from './courses/course-detail/course-content/course-content.component';
import { CourseStudentsComponent } from './courses/course-detail/course-students/course-students.component';
import { CourseAssignmentsComponent } from './courses/course-detail/course-assignments/course-assignments.component';
import { CalendarComponent } from './calendar/calendar.component';
import { StudentListItemComponent } from './courses/course-detail/course-students/student-list-item/student-list-item.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { AnnouncementListItemComponent } from './announcements/announcement-list-item/announcement-list-item.component';
import { AssignmentCreateNewComponent } from './assignments/assignment-create-new/assignment-create-new.component';
import { StudentGradesComponent } from './courses/course-detail/course-students/student-grades/student-grades.component';
import { StudentSubmissionsComponent } from './courses/course-detail/course-students/student-submissions/student-submissions.component';
import { ContentElementComponent } from './courses/course-detail/course-content/content-element/content-element.component';
import { StudentGradeListItemComponent } from './courses/course-detail/course-students/student-grades/student-grade-list-item/student-grade-list-item.component';
import { StudentSubmissionComponent } from './courses/course-detail/course-students/student-submission/student-submission.component';
import { StudentsService } from './courses/course-detail/course-students/students.service';
import { AuthGuard } from './auth/auth.guard';
import { CourseAnnouncementsComponent } from './courses/course-detail/course-announcements/course-announcements.component';
import { AnnouncementCreateNewComponent } from './announcements/announcement-create-new/announcement-create-new.component';
import { AssignmentDetailsComponent } from './assignments/assignment-details/assignment-details.component';

// import { AuthInterceptor } from './auth/auth-interceptor';


FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin
]);


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: WrapperLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'calendar', component: CalendarComponent },
      { path: 'assignments', component: AssignmentsComponent },
      { path: 'announcements', component: AnnouncementsComponent },
      {
        path: 'courses/course-detail',
        component: CourseDetailComponent,
        children: [
          { path: '', redirectTo: 'course-content', pathMatch: 'full' },
          { path: 'course-content', component: CourseContentComponent },
          { path: 'course-students', component: CourseStudentsComponent },
          { path: 'course-assignments', component: CourseAssignmentsComponent },
          { path: 'course-announcements', component: CourseAnnouncementsComponent }
        ],

      },

    ]
  },

];

@NgModule({
  declarations: [
    AppComponent,
    WrapperLayoutComponent,
    DashboardComponent,
    CourseCardComponent,
    AssignmentListItemComponent,
    CoursesComponent,
    AssignmentsComponent,
    CourseDetailComponent,
    CourseContentComponent,
    CourseStudentsComponent,
    CourseAssignmentsComponent,
    CalendarComponent,
    StudentListItemComponent,
    AnnouncementsComponent,
    AnnouncementListItemComponent,
    AssignmentCreateNewComponent,
    StudentGradesComponent,
    StudentSubmissionsComponent,
    ContentElementComponent,
    StudentGradeListItemComponent,
    StudentSubmissionComponent,
    CourseAnnouncementsComponent,
    AnnouncementCreateNewComponent,
    AssignmentDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    FullCalendarModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
  ],
  providers: [
    StudentsService,
    AuthGuard,
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
