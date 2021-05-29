import { Section } from "./section.model";

export interface Student {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  department: string;
  CGPA: number;
  studentSections: string[];
}
