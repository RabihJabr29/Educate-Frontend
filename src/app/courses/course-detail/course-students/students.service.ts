import { Injectable } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { Submission } from 'src/app/models/submission.model';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor() { }

  students: Student[] = [];
  currentStudent: Student;
  currentSubmission: Submission;

  setCurrentStudent(cStudent: Student) {
    this.currentStudent = cStudent;
  }

  async getStudentsFromServer(sectionId: string) {
    try {
      let res = await fetch("api/sections/" + sectionId + "/students", { method: 'GET' });
      if (res.status == 200) {
        let students_object = await res.json();
        students_object.forEach(student => {
          let newStudent: Student = {
            _id: student._id,
            fullName: student.fullName,
            email: student.email,
            phone: student.phone,
            CGPA: student.CGPA,
            department: student.department,
            studentSections: student.sections
          }
          this.students.push(newStudent)
        });
      } else {
        console.log(await res.text());
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getStudents(sectionId: string) {
    this.students = [];
    await this.getStudentsFromServer(sectionId);
    return [...this.students];
  }

  studentSubmissions = [];

  async getSubmissionsByStudentIdFromServer(studentId: string, sectionId: string) {
    try {

      let res = await fetch("api/submissions/section/" + sectionId + "/student/submissions/all/"
        + studentId, { method: 'GET' });
      if (res.status == 200) {
        let submission_object = await res.json();
        if (submission_object == undefined)
          return;
        submission_object.forEach(submission => {
          if (submission) {
            let newSubmission: Submission = {
              _id: submission._id,
              assignment: submission.assignment,
              student: submission.student,
              grade: submission.grade,
              isGraded: submission.isGraded,
              textSubmission: submission.textSubmission,
              comments: submission.comments,
              date: submission.date,
              // files to be added
            }
            this.studentSubmissions.push(newSubmission);
          }
        });
        console.log(this.studentSubmissions);
      } else {
        console.log(await res.text());
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getSubmissionsByStudentId(studentId: string, sectionId: string) {
    this.studentSubmissions = [];
    await this.getSubmissionsByStudentIdFromServer(studentId, sectionId);
    console.log(this.studentSubmissions);
    return [...this.studentSubmissions]
  }

  async gradeAssignment(id: string, grade: number, comments: string) {
    let data = {
      submission_id: id,
      grade: grade,
      comments: comments
    };
    try {
      let res = await fetch("api/submissions/grade", {
        method: 'PUT', body: JSON.stringify(data),
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
        console.log(res.text());
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getStudentSubmissionByAssignmentIDFromServer(student_id: string, assignment_id: string) {
    try {
      let res = await fetch("api/submissions/" + student_id + "/assignment/" + assignment_id, {
        method: 'GET'
      });
      if (res.status == 200) {
        let submission = await res.json();
        let newSubmission: Submission = {
          _id: submission._id,
          assignment: submission.assignment,
          student: submission.student,
          grade: submission.grade,
          isGraded: submission.isGraded,
          textSubmission: submission.textSubmission,
          comments: submission.comments,
          date: submission.date,
          // files to be added
        }
        this.assignmentSubmission = newSubmission;
      } else {
        console.log(res.text());
      }

    } catch (err) {
      console.log(err);
    }
  }

  assignmentSubmission: Submission;

  async getStudentSubmissionByAssignmentID(student_id: string, assignment_id: string) {
    await this.getStudentSubmissionByAssignmentIDFromServer(student_id, assignment_id);
    return this.assignmentSubmission;
  }

  async submitAssignment(data) {
    try {
      let res = await fetch("api/submissions/submit", {
        method: 'POST', body: JSON.stringify(data),
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
        console.log(res.text());
      }
    } catch (err) {
      console.log(err);
    }
  }
}
