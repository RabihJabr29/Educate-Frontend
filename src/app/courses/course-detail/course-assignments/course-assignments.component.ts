import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from 'src/app/assignments/assignments.service';
import { Assignment } from 'src/app/models/assignment.model';
import { CoursesService } from '../../courses.service';

@Component({
  selector: 'app-course-assignments',
  templateUrl: './course-assignments.component.html',
  styleUrls: ['./course-assignments.component.css']
})
export class CourseAssignmentsComponent implements OnInit {

  constructor(private assignemntsService: AssignmentsService, private coursesService: CoursesService) { }


  assignments: Assignment[] = [];

  async ngOnInit() {
    let sectionId: string = this.coursesService.currentSection;
    this.assignments = await this.assignemntsService.getAssignmentsBySectionId(sectionId);
    this.assignemntsService.assignmentsChanged.subscribe(async flag => {
      if (flag) {
        let sectionId: string = this.coursesService.currentSection;
        this.assignments = await this.assignemntsService.getAssignmentsBySectionId(sectionId);
      }
    });
  }

}
