import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { async } from 'rxjs/internal/scheduler/async';
import { catchError, retry } from 'rxjs/operators';
import { Section } from '../models/section.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) { }

  sections: Section[] = [];
  currentSection: string;

  async getCoursesFromServer() {
    try {

      let res = await fetch("api/instructors/60ad3a09c43d1a2d74cf0820/sections", { method: 'GET' });
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
          this.sections.push(newSection)
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
    await this.getCoursesFromServer();
    return [...this.sections];
  }

}
