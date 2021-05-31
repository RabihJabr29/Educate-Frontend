import { Component, Input, OnInit } from '@angular/core';
import { Announcement } from 'src/app/models/announcement.model';
import { Section } from 'src/app/models/section.model';

@Component({
  selector: 'app-announcement-list-item',
  templateUrl: './announcement-list-item.component.html',
  styleUrls: ['./announcement-list-item.component.css']
})
export class AnnouncementListItemComponent implements OnInit {

  constructor() { }
  @Input() announcement: Announcement;
  courseName: string;
  announcementTitle: string;
  announcementDescription: string;
  ngOnInit(): void {
    this.courseName = "Course Name 1"
    this.announcementTitle = "Announcement Title"
    this.announcementDescription = " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod quae odioexcepturi libero ad dolor repudiandae ratione harum, quis voluptas ?Repellendus nisi aliquam optio labore, debitis iste ut aspernatur et."
  }

}
