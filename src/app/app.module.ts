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
import { CourseGradesComponent } from './courses/course-detail/course-grades/course-grades.component';
import { CalendarComponent } from './calendar/calendar.component';
import { StudentListItemComponent } from './courses/course-detail/course-students/student-list-item/student-list-item.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { AnnouncementListItemComponent } from './announcements/announcement-list-item/announcement-list-item.component';
import { AssignmentCreateNewComponent } from './assignments/assignment-create-new/assignment-create-new.component';

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
          { path: 'course-grades', component: CourseGradesComponent }
        ]
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
    CourseGradesComponent,
    CalendarComponent,
    StudentListItemComponent,
    AnnouncementsComponent,
    AnnouncementListItemComponent,
    AssignmentCreateNewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    FullCalendarModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
