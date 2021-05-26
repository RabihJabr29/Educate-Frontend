import { Injectable } from '@angular/core';
import { Assignment } from '../models/assignment.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  constructor() { }

  assignments: Assignment[] = [];
  allAssignments: Assignment[] = [];

  async getAssignmentsbySectionIdFromServer(sectionId: string) {
    try {

      let res = await fetch("api/assignments/" + sectionId + "/all", { method: 'GET' });
      if (res.status == 200) {
        let assignments = await res.json();
        assignments.forEach(assignment => {
          let newAssignment: Assignment = {
            _id: assignment._id,
            type: assignment.type,
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
            // files: assignment.files, // ids
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
    console.log(sectionId)
    await this.getAssignmentsbySectionIdFromServer(sectionId);
    return [...this.assignments];
  }

  async getAllAssignmentsFromServer() {
    try {

      let res = await fetch("api/assignments/all", { method: 'GET' });
      if (res.status == 200) {
        let assignments = await res.json();
        assignments.forEach(assignment => {
          let newAssignment: Assignment = {
            _id: assignment._id,
            type: assignment.type,
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
            // files: assignment.files, // ids
          }
          this.allAssignments.push(newAssignment);
        });

      } else {
        console.log(await res.text());
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getAllAssignments() {
    this.allAssignments = [];
    await this.getAllAssignmentsFromServer();
    return [...this.allAssignments];
  }
}
