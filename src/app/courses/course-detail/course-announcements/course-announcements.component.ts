import { Component, OnInit } from '@angular/core';
import { AnnouncementsService } from 'src/app/announcements/announcements.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Announcement } from 'src/app/models/announcement.model';

@Component({
  selector: 'app-course-announcements',
  templateUrl: './course-announcements.component.html',
  styleUrls: ['./course-announcements.component.css']
})
export class CourseAnnouncementsComponent implements OnInit {
  constructor(private announcementsService: AnnouncementsService) { }
  announcements: Announcement[] = [];

  async ngOnInit() {
    await this.announcementsService.getAnnouncementsBySectionId();
    this.announcements = this.announcementsService.sectionAnnouncements;
    this.announcementsService.announcementsChanged.subscribe(async flag => {
      if (flag) {
        await this.announcementsService.getAnnouncementsBySectionId();
        this.announcements = this.announcementsService.sectionAnnouncements;
      }
    });
    console.log(this.announcements);
  }

}
