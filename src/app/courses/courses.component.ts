import { Component, OnInit } from '@angular/core';
import { Section } from '../models/section.model';
import { WrapperService } from '../wrapper-layout/wrapper.service';
import { CoursesService } from './courses.service';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  constructor(private coursesService: CoursesService) { }

  sections: Section[] = [];

  async ngOnInit() {
    this.sections = await this.coursesService.getCourses();
  }

}
