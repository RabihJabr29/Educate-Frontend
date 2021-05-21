import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-announcement-list-item',
  templateUrl: './announcement-list-item.component.html',
  styleUrls: ['./announcement-list-item.component.css']
})
export class AnnouncementListItemComponent implements OnInit {

  constructor() { }

  courseName: string;
  announcementTitle: string;
  announcementDescription: string;

  ngOnInit(): void {
    this.courseName = "Course Name 1"
    this.announcementTitle = "Announcement Title"
    this.announcementDescription = " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod quae odioexcepturi libero ad dolor repudiandae ratione harum, quis voluptas ?Repellendus nisi aliquam optio labore, debitis iste ut aspernatur et."
  }

}
