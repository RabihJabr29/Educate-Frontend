import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CoursesService } from 'src/app/courses/courses.service';
import { AnnouncementsService } from '../announcements.service';
import { CreateAnnouncementModalConfig } from './announcement-modal.config';

@Component({
  selector: 'app-announcement-create-new',
  templateUrl: './announcement-create-new.component.html',
  styleUrls: ['./announcement-create-new.component.css']
})
export class AnnouncementCreateNewComponent implements OnInit {
  @Input() public modalConfig: CreateAnnouncementModalConfig;
  @ViewChild('createAnnouncementModal') private modalContent: TemplateRef<AnnouncementCreateNewComponent>;
  private modalRef: NgbModalRef;

  model;


  constructor(private modalService: NgbModal, private coursesService: CoursesService, private announcementsService: AnnouncementsService) { }

  ngOnInit(): void { }


  open(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.modalRef = this.modalService.open(this.modalContent, { size: 'md', backdrop: 'static' })
      this.modalRef.result.then(resolve, resolve)
    })
  }

  async close(): Promise<void> {
    if (this.modalConfig.shouldClose === undefined || (await this.modalConfig.shouldClose())) {
      const result = this.modalConfig.onClose === undefined || (await this.modalConfig.onClose())
      this.modalRef.close(result)
    }
  }

  async dismiss(): Promise<void> {
    if (this.modalConfig.shouldDismiss === undefined || (await this.modalConfig.shouldDismiss())) {
      const result = this.modalConfig.onDismiss === undefined || (await this.modalConfig.onDismiss())
      this.modalRef.dismiss(result)
    }
  }

  announcementTitle: string;
  announcementTitleValid: boolean = true;
  announcementDescription: string;
  announcementDescriptionValid: boolean = true;

  create() {
    if (this.announcementTitle == null) {
      this.announcementTitleValid = false;
      return;
    } else this.announcementTitleValid = true;

    if (this.announcementDescription == null) {
      this.announcementDescriptionValid = false;
      return;
    } else this.announcementDescriptionValid = true;

    this.announcementsService.createAnnouncement(this.announcementTitle, this.announcementDescription);
    this.close();
  }
}
