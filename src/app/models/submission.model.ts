import { Assignment } from "./assignment.model";
import { Student } from "./student.model";

export interface Submission {
  _id: string;
  student: Student;
  assignment: Assignment;
  grade: number;
  isGraded?: boolean;
  textSubmission?: string;
  comments?: string;
  date: string;
  // files: File[]
}
