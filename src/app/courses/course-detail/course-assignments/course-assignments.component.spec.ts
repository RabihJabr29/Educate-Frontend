import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CourseAssignmentsComponent } from './course-assignments.component';

describe('CourseAssignmentsComponent', () => {
  let component: CourseAssignmentsComponent;
  let fixture: ComponentFixture<CourseAssignmentsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseAssignmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
