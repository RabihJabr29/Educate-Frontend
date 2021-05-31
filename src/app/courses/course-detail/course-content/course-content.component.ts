import { Component, OnInit } from '@angular/core';
import { FileHierarchy } from 'src/app/models/file-hierarchy.model';
import { CoursesService } from '../../courses.service';

@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.css']
})
export class CourseContentComponent implements OnInit {

  //contentElements = [{ title: "Chapters", icon: "folder", children: [{ title: "HTML & CSS", icon: "folder", children: [{ title: "HTML & CSS Tutorial", icon: "picture_as_pdf", children: [] }] }, { title: "List of Topics", icon: "picture_as_pdf", children: [] }] }, { title: "Syllabus", icon: "picture_as_pdf", children: [] }];

  displayedElements: FileHierarchy[] = [];
  currentPath: string = "root";

  constructor(private coursesService: CoursesService) {
  }

  async ngOnInit() {
    await this.coursesService.getCourseContent(this.coursesService.currentSection, this.currentPath);
    this.displayedElements = this.coursesService.rootChildren;
    this.coursesService.contentDeletedEventEmitter.subscribe(async flag => {
      await this.coursesService.getCourseContent(this.coursesService.currentSection, this.currentPath);
      this.displayedElements = this.coursesService.rootChildren;
    })
    this.coursesService.currentPath = this.currentPath;
  }

  clickCount: number = 0;
  inProgress: Boolean = false;
  previousElements: string[] = [];

  async onClickElement(element) {
    this.clickCount += 1;
    if (!this.inProgress) {
      this.inProgress = true;
      setTimeout(async () => {
        if (this.clickCount == 1) {
          if (element.icon == "reply") {
            this.currentPath = this.previousElements.pop();
            this.coursesService.currentPath = this.currentPath;
            await this.coursesService.getCourseContent(this.coursesService.currentSection, this.currentPath);
            this.displayedElements = this.coursesService.rootChildren;
            if (this.currentPath != 'root') {
              let backElement: FileHierarchy = { path: "", name: "Back", type: "back", data: "", icon: "reply", mimetype: "", children: [] };
              this.displayedElements.splice(0, 0, backElement);
            }
          } else {
            // download file if it is not a folder.
            if (element.type == "file") {
              this.coursesService.getFile(element.data);
              // we need to add a 'children' attribute to each of our elements, only populate it if it is
              // a folder.this way we can always see inside the folder and go back.
            }
          }
        } else if (this.clickCount == 2) {
          if (element.type == 'folder') {
            let backElement: FileHierarchy = { path: "", name: "Back", type: "back", data: "", icon: "reply", mimetype: "", children: [] };
            this.previousElements.push(this.currentPath);
            this.currentPath = element.path;
            this.coursesService.currentPath = this.currentPath;
            await this.coursesService.getCourseContent(this.coursesService.currentSection, this.currentPath);
            this.displayedElements = this.coursesService.rootChildren;
            this.displayedElements.splice(0, 0, backElement);
          }
        }
        this.inProgress = false;
        this.clickCount = 0;
      }, 250)
    }
  }
}
