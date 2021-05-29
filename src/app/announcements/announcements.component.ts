import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {

  userType: string;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userType = this.authService.getUserType();
  }

}
