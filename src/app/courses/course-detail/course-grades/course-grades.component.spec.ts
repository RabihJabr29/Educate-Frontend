import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CourseGradesComponent } from './course-grades.component';

describe('CourseGradesComponent', () => {
  let component: CourseGradesComponent;
  let fixture: ComponentFixture<CourseGradesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseGradesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
