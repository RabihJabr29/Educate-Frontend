import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSubmissionsComponent } from './student-submissions.component';

describe('StudentSubmissionsComponent', () => {
  let component: StudentSubmissionsComponent;
  let fixture: ComponentFixture<StudentSubmissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentSubmissionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentSubmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
