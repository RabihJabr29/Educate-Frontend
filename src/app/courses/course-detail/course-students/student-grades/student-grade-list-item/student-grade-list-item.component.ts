import { Component, Input, OnInit } from '@angular/core';
import { Assignment } from 'src/app/models/assignment.model';
import { Submission } from 'src/app/models/submission.model';
import { StudentsService } from '../../students.service';

@Component({
  selector: 'app-student-grade-list-item',
  templateUrl: './student-grade-list-item.component.html',
  styleUrls: ['./student-grade-list-item.component.css']
})
export class StudentGradeListItemComponent implements OnInit {
  @Input() submission: Submission;

  assignment: Assignment;
  submissionStatus: string;
  submissionGrade: any;

  constructor(private studentsService: StudentsService) { }

  ngOnInit(): void {
    this.assignment = this.submission.assignment;
    this.submissionStatus = this.submission.isGraded ? "Graded" : "Submitted";
    if (!this.submission.isGraded) {
      this.submissionGrade = "NA";
    } else {
      this.submissionGrade = this.submission.grade;
    }
  }

  onClickStudentGradeListItem() {
    this.studentsService.currentSubmission = this.submission;
  }

}
