import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CoursesService } from '../../courses.service';
import { CreateUploadModalConfig } from './create-upload-modal.config';

@Component({
  selector: 'app-create-upload',
  templateUrl: './create-upload.component.html',
  styleUrls: ['./create-upload.component.css']
})
export class CreateUploadComponent implements OnInit {
  @Input() public modalConfig: CreateUploadModalConfig;
  @ViewChild('createUploadModal') private modalContent: TemplateRef<CreateUploadComponent>;
  private modalRef: NgbModalRef;

  model;


  constructor(private modalService: NgbModal, private coursesService: CoursesService) { }

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

  folderName: string;
  folderNameValid: boolean = true;

  createOrUpload() {
    if (this.modalConfig.createButtonLabel == 'Create') {
      if (this.folderName == null) {
        this.folderNameValid = false;
        return;
      } else this.folderNameValid = true;

      let section_id = this.coursesService.currentSection;
      let currentPath = this.coursesService.currentPath;
      this.coursesService.createNewFolder(section_id, currentPath, this.folderName);
    } else if (this.modalConfig.createButtonLabel == 'Upload') {
      if (this.fileToUpload == null) {
        this.fileUploadValid = false;
        return;
      } else {
        this.fileUploadValid = true;
      }
      let section_id = this.coursesService.currentSection;
      let currentPath = this.coursesService.currentPath;

			if(this.fileToUpload.size > 0)
      this.coursesService.uploadFile(section_id, currentPath,this.fileToUpload);
    }
    this.close();
  }

  fileToUpload: File = null;
  fileUploadValid: boolean = true;

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
}
