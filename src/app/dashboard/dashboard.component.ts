import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WrapperService } from '../wrapper-layout/wrapper.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private wrapperService: WrapperService) { }

  ngOnInit(): void {
  }


  onClickViewCourses() {
    this.router.navigateByUrl("/courses");
    console.log("courses");
    this.wrapperService.navigateTo("courses");
  }

}
