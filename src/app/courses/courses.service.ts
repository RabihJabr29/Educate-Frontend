import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

import { Section } from '../models/section.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private authService: AuthService) { }
  allSemestersSections: Section[] = [];
  sections: Section[] = [];
  currentSection: string;
  currentSectionObject: Section;

  async getCoursesFromServer() {
    try {
      let backendURL: string;
      let userType = this.authService.getUserType();
      let userId: string = this.authService.getUserId();

      if (userType == 'instructor') {
        backendURL = "api/instructors/" + userId + "/sections";
      } else {
        backendURL = "api/students/" + userId + "/courses";
      }
      let res = await fetch(backendURL, { method: 'GET', credentials: 'include' },);
      if (res.status == 200) {
        let sections_object = await res.json();
        sections_object.forEach(section => {
          let newSection: Section = {
            _id: section._id,
            CRN: section.CRN,
            course: section.course,
            semester: section.semester,
            startDate: section.startDate,
            endDate: section.endDate,
            capacity: section.capacity,
            schedule: section.schedule,
            instructors: section.instructors, // ids
            assignments: section.assignments, // ids
            students: section.students, // ids
          }
          this.allSemestersSections.push(newSection)
        });
      } else {
        console.log(await res.text());
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getCourses() {
    this.sections = [];
    this.allSemestersSections = [];
    await this.getCoursesFromServer();
    // this.allSemestersSections.forEach((section) => {

    // });
    this.sections = this.allSemestersSections;
    return [...this.sections];
  }

  async getCourseByIdFromServer(sectionId: string) {
    try {

      let res = await fetch("api/sections/" + sectionId, { method: 'GET' });
      if (res.status == 200) {
        let section = await res.json();
        let newSection: Section = {
          _id: section._id,
          CRN: section.CRN,
          course: section.course,
          semester: section.semester,
          startDate: section.startDate,
          endDate: section.endDate,
          capacity: section.capacity,
          schedule: section.schedule,
          instructors: section.instructors, // ids
          assignments: section.assignments, // ids
          students: section.students, // ids
        }
        this.currentSectionObject = newSection;
      } else {
        console.log(await res.text());
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getCourseById(sectionId: string) {
    await this.getCourseByIdFromServer(sectionId);
  }

}
