import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CourseStudentsComponent } from './course-students.component';

describe('CourseStudentsComponent', () => {
  let component: CourseStudentsComponent;
  let fixture: ComponentFixture<CourseStudentsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
