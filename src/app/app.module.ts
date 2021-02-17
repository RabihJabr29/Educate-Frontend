import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WrapperLayoutComponent } from './wrapper-layout/wrapper-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { AssignmentListItemComponent } from './components/assignment-list-item/assignment-list-item.component';
import { CoursesComponent } from './courses/courses.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AssignmentsComponent } from './assignments/assignments.component';

// import { AuthInterceptor } from './auth/auth-interceptor';



@NgModule({
  declarations: [
    AppComponent,
    WrapperLayoutComponent,
    DashboardComponent,
    CourseCardComponent,
    AssignmentListItemComponent,
    CoursesComponent,
    AssignmentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
