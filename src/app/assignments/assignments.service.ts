import { EventEmitter, Injectable, Output } from '@angular/core';
import { CoursesService } from '../courses/courses.service';
import { Assignment } from '../models/assignment.model';
import { Section } from '../models/section.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  constructor(private coursesService: CoursesService) { }

  assignments: Assignment[] = [];
  allAssignments: Assignment[] = [];
  sections: Section[] = [];

  getAllAssignmentsCopy() {
    return [...this.allAssignments];
  }

  async getAssignmentsbySectionIdFromServer(sectionId: string) {
    try {
      this.assignments = [];
      let res = await fetch("api/assignments/" + sectionId + "/all", { method: 'GET' });
      if (res.status == 200) {
        let assignments = await res.json();
        assignments.forEach(assignment => {
          let newAssignment: Assignment = {
            assignment_id: assignment._id,
            type: assignment.type,
            name: assignment.name,
            section: assignment.section,
            description: assignment.description,
            startDate: assignment.startDate,
            startTime: assignment.startTime,
            maxGrade: assignment.maxGrade,
            gradePercentage: assignment.gradePercentage,
            endDate: assignment.endDate,
            endTime: assignment.endTime,
            visibility: assignment.visibility,
            isActive: assignment.isActive,
            isVisible: assignment.isVisible, // ids
            allowMultipleSubmissions: assignment.allowMultipleSubmissions, // ids
            allowLateSubmissions: assignment.allowLateSubmissions,
            files: assignment.files, // no ids
          }
          this.assignments.push(newAssignment);
        });

      } else {
        console.log(await res.text());
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getAssignmentsBySectionId(sectionId: string) {
    this.assignments = [];
    await this.getAssignmentsbySectionIdFromServer(sectionId);
    return [...this.assignments];
  }

  gettingAssignmnets: boolean = false;
  async getAllAssignmentsFromServer() {
    try {
      this.sections = this.coursesService.allSemestersSections;
      let i;
      for (i = 0; i < this.sections.length; i++) {
        let section = this.sections[i];
        let res = await fetch("api/assignments/" + section._id + "/all", { method: 'GET' });
        if (res.status == 200) {
          let assignments = await res.json();
          assignments.forEach(assignment => {
            let newAssignment: Assignment = {
              assignment_id: assignment._id,
              type: assignment.type,
              section: assignment.section,
              name: assignment.name,
              description: assignment.description,
              startDate: assignment.startDate,
              startTime: assignment.startTime,
              maxGrade: assignment.maxGrade,
              gradePercentage: assignment.gradePercentage,
              endDate: assignment.endDate,
              endTime: assignment.endTime,
              visibility: assignment.visibility,
              isActive: assignment.isActive,
              isVisible: assignment.isVisible, // ids
              allowMultipleSubmissions: assignment.allowMultipleSubmissions, // ids
              allowLateSubmissions: assignment.allowLateSubmissions,
              files: assignment.files, // not the ids
            }
            this.allAssignments.push(newAssignment);
          });
        } else {
          console.log(await res.text());
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getAllAssignments() {
    if (this.coursesService.allSemestersSections.length == 0)
      await this.coursesService.getCoursesFromServer();
    this.allAssignments = [];
    await this.getAllAssignmentsFromServer();
    return [...this.allAssignments];
  }

  async createAssignment(assignmnet: FormData) {
    // create assingmnet
    console.log("service create");
    try {
      let res = await fetch("api/assignments/", {
        method: 'POST', body: assignmnet,
        mode: 'cors',
        credentials: 'include',
      });
      if (res.status == 201) {
        let body = await res.json();
        console.log(res);
      } else {
        console.log(await res.text());
      }

    } catch (err) {
      console.log(err);
    }
    this.assignmentsChanged.emit(true);
  }

  async editAssignment(assignmnet: FormData) {
    try {
      let res = await fetch("api/assignments/", {
        method: 'PUT', body: assignmnet,
        mode: 'cors',
        credentials: 'include',
      });
      if (res.status == 201) {
        let body = await res.json();
        console.log(res);
      } else {
        console.log(await res.text());
      }

    } catch (err) {
      console.log(err);
    }
    this.assignmentsChanged.emit(true);
  }

  @Output() editEventEmitter = new EventEmitter<Assignment>();
  @Output() assignmentsChanged = new EventEmitter<boolean>();
  assignementEdit: Assignment;

  async deleteAssignment(id: string) {
    try {
      let data = { assignment_id: id };
      let res = await fetch("api/assignments/", {
        method: 'DELETE', body: JSON.stringify(data),
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
      });
      if (res.status == 201) {
        console.log(res);
      } else {
        console.log(await res.text());
      }
    } catch (err) {
      console.log(err);
    }
    this.assignmentsChanged.emit(true);
  }

  selectedAssignment: Assignment;

}
