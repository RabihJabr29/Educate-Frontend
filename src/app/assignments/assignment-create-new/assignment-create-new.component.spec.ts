import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentCreateNewComponent } from './assignment-create-new.component';

describe('AssignmentCreateNewComponent', () => {
  let component: AssignmentCreateNewComponent;
  let fixture: ComponentFixture<AssignmentCreateNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignmentCreateNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentCreateNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
