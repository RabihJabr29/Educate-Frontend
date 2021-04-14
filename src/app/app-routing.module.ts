import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssignmentsComponent } from './assignments/assignments.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CourseAssignmentsComponent } from './courses/course-detail/course-assignments/course-assignments.component';
import { CourseContentComponent } from './courses/course-detail/course-content/course-content.component';
import { CourseDetailComponent } from './courses/course-detail/course-detail.component';
import { CourseGradesComponent } from './courses/course-detail/course-grades/course-grades.component';
import { CourseStudentsComponent } from './courses/course-detail/course-students/course-students.component';
import { CoursesComponent } from './courses/courses.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WrapperLayoutComponent } from './wrapper-layout/wrapper-layout.component';


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
      {
        path: 'courses/course-detail',
        component: CourseDetailComponent,
        children: [
          { path: '', redirectTo: 'course-content', pathMatch: 'full' },
          { path: 'course-content', component: CourseContentComponent },
          { path: 'course-students', component: CourseStudentsComponent },
          { path: 'course-asssignments', component: CourseAssignmentsComponent },
          { path: 'course-grades', component: CourseGradesComponent }

        ]
      },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
