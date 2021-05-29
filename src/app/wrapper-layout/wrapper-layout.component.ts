import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WrapperService } from './wrapper.service';

import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-wrapper-layout',
  templateUrl: './wrapper-layout.component.html',
  styleUrls: ['./wrapper-layout.component.css']
})
export class WrapperLayoutComponent implements OnInit {

  toggled: string = "";
  active: string;
  private activePathListenerSubs: Subscription;
  userType: string;

  constructor(private router: Router, private wrapperService: WrapperService, private authService: AuthService) { }
  ngOnInit(): void {
    // this.active = this.wrapperService.getActiveStatus();
    this.activePathListenerSubs = this.wrapperService.getActiveStatusListener().subscribe(
      (path) => {
        this.active = path;
      }
    );
    this.active = this.router.url.slice(1);
    this.userType = this.authService.getUserType();
  }

  toggleMenu(e: Event) {
    e.preventDefault();
    if (this.toggled == "")
      this.toggled = "toggled";
    else this.toggled = "";
  }


  onClickListItemDashboard() {
    this.active = 'dashboard';
    this.router.navigateByUrl("/dashboard");
  }

  onClickListItemCourses() {
    this.active = 'courses';
    this.router.navigateByUrl("/courses");
  }

  onClickListItemAssignments() {
    this.active = 'assignments';
    this.router.navigateByUrl("/assignments");
  }

  onClickListItemCalendar() {
    this.active = 'calendar';
    this.router.navigateByUrl("/calendar");
  }

  onClickListItemAnnouncement() {
    this.active = 'announcements'
    this.router.navigateByUrl("/announcements");

  }

  onClickLogout() {
    this.active = '';
    this.authService.logout();
    this.router.navigateByUrl("auth/login");
  }
}
