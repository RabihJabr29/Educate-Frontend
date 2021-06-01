import { EventEmitter, Injectable, Output } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FileHierarchy } from '../models/file-hierarchy.model';

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
  deleteContentInProgress: boolean = false;

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



  async getCourseContent(section_id: string, currentPath: string) {
    this.rootChildren = [];
    await this.getHierarchyFromServer(section_id, currentPath);
    return [...this.rootChildren];
  }

  rootChildren: FileHierarchy[] = [];

  async getHierarchyFromServer(section_id: string, currentPath: string) {
    try {
      let reqPath = currentPath;
      let req = await fetch("api/hierarchies/" + section_id + `/?path=${reqPath}`, {
        method: 'GET',
        mode: 'cors'
      });
      this.rootChildren = [];
      if (req.status === 200) {
        let res = await req.json();
        res.children.forEach(child => {
          let newChild: FileHierarchy = {
            path: child.path,
            name: child.name,
            type: child.type,
            data: child.data,
            mimetype: child.mimetype,
            children: child.children,
          };
          newChild.icon = this.getFileIcon(newChild.mimetype);
          newChild.name = newChild.name.slice(0, 16);
          if (newChild.type == 'folder')
            newChild.icon = "folder";
          this.rootChildren.push(newChild);
        });
      } else {
        console.log(await req.text());
      }
    } catch (err) {
      console.log(err);
    }

  }

  getFileIcon(mimetype: string) {
    let icon: string;
    switch (mimetype) {
      case 'application/pdf':
        icon = "picture_as_pdf";
        break;
      case 'text/plain':
        icon = "description";
        break;
      case 'image/gif':
        icon = "image";
        break;

      case 'image/jpeg':
        icon = "image";
        break;
      case 'image/png':
        icon = "image";
        break;
      case "application/msword":
        icon = "description";
        break;
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        icon = "description";
        break;
      default:
        icon = "insert_drive_file";
        break;
    }

    return icon;
  }

  async getFile(data_id: string) {
    if (this.deleteContentInProgress) {
      this.deleteContentInProgress = false;
      return;
    }
    try {
      let req = await fetch(`api/hierarchies/file/${data_id}`);
      if (req.status === 200) {
        let res = await req.json();
        let blob = new Blob([new Uint8Array(res.data.data)], {
          type: res.type
        });
        let link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = res.name;
        link.click();
        link.remove();
      }
    } catch (err) {
      console.log(err);
    }
  }

  currentPath: string;
  courseContentEditMode: boolean = false;
  @Output() editModeEventEmitter = new EventEmitter<boolean>();

  @Output() contentDeletedEventEmitter = new EventEmitter<boolean>();

  async deleteContent(sectionId: string, path: string) {
    if (this.authService.getUserType() == 'student')
      return;
    try {
      let data = { section_id: sectionId, path: path };
      let req = await fetch('api/hierarchies/', {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (req.status === 201) {
        // return new hierarchy
        this.contentDeletedEventEmitter.emit(true);
      } else {
        console.log(req.status + " " + await req.text());
      }
    } catch (err) {
      console.log(err);
    }
  }

  async createNewFolder(section_id: string, currentPath: string, folderName: string) {
    try {

      let data = {
        section_id: section_id,
        parentPath: currentPath,
        type: "folder",
        name: folderName
      };

      let req = await fetch('api/hierarchies/', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (req.status === 201) {
        this.contentDeletedEventEmitter.emit(true);
      } else {
        console.log(await req.text())
      }
    } catch (err) {
      console.log(err);
    }
  }

  async uploadFile(section_id: string, currentPath: string, file: File) {
    try {
      let data = {
        section_id: section_id,
        parentPath: currentPath,
        type: "file",
      };

      let formData = new FormData();

      for (let prop in data)
        formData.append(prop, data[prop]);

      formData.append('files', file);


      let req = await
        fetch('api/hierarchies/upload', {
          method: 'POST',
          mode: 'cors',
          body: formData
        });
      if (req.status === 201) {
        this.contentDeletedEventEmitter.emit(true);
        console.log(await req.json());
      } else {
        console.log(req.status + " " + await req.text());
      }

    } catch (err) {
      console.log(err);
    }
  }

}

