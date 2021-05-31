import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { CoursesService } from 'src/app/courses/courses.service';
import { FileHierarchy } from 'src/app/models/file-hierarchy.model';

@Component({
  selector: 'app-content-element',
  templateUrl: './content-element.component.html',
  styleUrls: ['./content-element.component.css']
})
export class ContentElementComponent implements OnInit {

  editMode: boolean;

  userType: string;

  @Input() element: FileHierarchy;

  constructor(private coursesService: CoursesService, private authService: AuthService) { }

  ngOnInit(): void {
    // this.coursesService.editModeEventEmitter.subscribe(flag => {
    //   this.editMode = flag;
    // });
    this.userType = this.authService.getUserType();
  }

  onMouseEnter() {
    this.editMode = true;
  }

  onMouseLeave() {
    this.editMode = false;
  }

  onClickDeleteContent() {
    if (this.userType == 'student')
      return;
    if (confirm("Are you sure you want to delete this item")) {
      this.coursesService.deleteContent(this.coursesService.currentSection, this.element.path);
    }
  }

}
