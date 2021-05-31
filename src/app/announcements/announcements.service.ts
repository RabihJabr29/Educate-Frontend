import { EventEmitter, Injectable, Output } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CoursesService } from '../courses/courses.service';
import { Announcement } from '../models/announcement.model';
import { Section } from '../models/section.model';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementsService {

  constructor(private coursesService: CoursesService, private authService: AuthService) { }

  sections: Section[] = [];
  allAnnouncements: Announcement[] = [];
  gettingAssignmnets: boolean = false;

  @Output() announcementsChanged = new EventEmitter<boolean>();

  async getAllAnnouncementsFromServer() {
    try {
      let userType = this.authService.getUserType();
      let url = '';
      if (userType == 'student') {
        url = "api/announcements/student/" + this.authService.getUserId();
      } else {
        url = "api/announcements/instructor/" + this.authService.getUserId();
      }
      let res = await fetch(url, { method: 'GET' });
      if (res.status == 200) {
        let announcements_object = (await res.json());
        announcements_object.forEach(a => {
          this.allAnnouncements.push(a);
        });
      } else {
        console.log(await res.text());
      }

    } catch (err) {
      console.log(err);
    }
  }

  async getAllAnnouncements() {
    if (this.coursesService.allSemestersSections.length == 0)
      await this.coursesService.getCoursesFromServer();
    this.allAnnouncements = [];
    await this.getAllAnnouncementsFromServer();
    return [...this.allAnnouncements];
  }

  async getAnnouncementsBySectionIDFromServer(section_id: string) {
    try {
      let res = await fetch("api/announcements/section/" + section_id, { method: 'GET' });
      if (res.status == 200) {
        let announcements_object = (await res.json());
        announcements_object.forEach(a => {
          this.sectionAnnouncements.push(a);
        });
      } else {
        console.log(await res.text());
      }
    } catch (err) {
      console.log(err);
    }
  }

  sectionAnnouncements: Announcement[] = [];
  async getAnnouncementsBySectionId() {
    let section_id = this.coursesService.currentSection;
    this.sectionAnnouncements = [];
    await this.getAnnouncementsBySectionIDFromServer(section_id);
    console.log(this.sectionAnnouncements);
    return [...this.sectionAnnouncements];
  }

  async createAnnouncement(title: string, description: string) {
    let section_id = this.coursesService.currentSection;
    let data = {
      section_id: section_id,
      title: title,
      description: description
    };
    try {
      let res = await fetch("api/announcements/", {
        method: 'POST', body: JSON.stringify(data),
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
      });
      if (res.status == 201) {
        console.log(res);
        this.announcementsChanged.emit(true);
      } else {
        console.log(await res.text());
      }
    } catch (err) {
      console.log(err);
    }
  }
}

