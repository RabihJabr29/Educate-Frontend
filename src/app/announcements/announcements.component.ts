import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Announcement } from '../models/announcement.model';
import { AnnouncementsService } from './announcements.service';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {

  userType: string;
  constructor(private authService: AuthService, private announcementsService: AnnouncementsService) { }
   announcements: Announcement[] = [];

  async ngOnInit() {
    this.userType = this.authService.getUserType();
    this.announcements = await this.announcementsService.getAllAnnouncements();
  }

}
