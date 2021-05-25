import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.css']
})
export class CourseContentComponent implements OnInit {

  contentElements = [{ title: "Chapters", icon: "folder", children: [{ title: "HTML & CSS", icon: "folder", children: [{ title: "HTML & CSS Tutorial", icon: "picture_as_pdf", children: [] }] }, { title: "List of Topics", icon: "picture_as_pdf", children: [] }] }, { title: "Syllabus", icon: "picture_as_pdf", children: [] }];

  displayedElements;

  constructor() {
  }

  ngOnInit(): void {
    this.displayedElements = this.contentElements;
  }

  clickCount: number = 0;
  inProgress: Boolean = false;
  previousElements: { title: string, icon: string, children: [] }[] = [];

  onClickElement(element) {
    this.clickCount += 1;
    if (!this.inProgress) {
      this.inProgress = true;
      setTimeout(() => {
        if (this.clickCount == 1) {
          if (element.icon == "reply") {
            this.displayedElements.splice(0, 1);
            console.log(this.previousElements[this.previousElements.length - 1])
            console.log(typeof (this.previousElements[0]));
            this.displayedElements = this.previousElements[this.previousElements.length - 1];
            this.previousElements.pop();
          } else {
            // download file if it is not a folder.
            if (element.icon != "folder") {
              // we need to add a 'children' attribute to each of our elements, only populate it if it is
              // a folder.this way we can always see inside the folder and go back.
            }
          }
        } else if (this.clickCount == 2) {
          console.log("double")
          if (element.icon == 'folder') {
            let backElement = { title: "Back", icon: "reply", type: "backButton" };
            this.previousElements.push(this.displayedElements);
            this.displayedElements = element.children;
            this.displayedElements.splice(0, 0, backElement);
          }
        }
        this.inProgress = false;
        this.clickCount = 0;
      }, 250)
    }
  }
}
