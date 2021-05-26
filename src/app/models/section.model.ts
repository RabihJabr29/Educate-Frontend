import { Course } from "./course.model";

export interface Section {
  _id: string,
  CRN: number,
  course: Course,
  semester: string,
  startDate: string,
  endDate: string,
  capacity: number,
  schedule: string,
  instructors: string[], // ids
  assignments: string[], // ids
  students: string[], // ids
}
