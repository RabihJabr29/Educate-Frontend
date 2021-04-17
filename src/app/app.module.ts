import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
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

// import { AuthInterceptor } from './auth/auth-interceptor';


FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin
]);

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    FullCalendarModule
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
