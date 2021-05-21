import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AssignmentCreateNewComponent } from './assignment-create-new/assignment-create-new.component';
import { ModalConfig } from './assignment-create-new/modal.config';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


}
