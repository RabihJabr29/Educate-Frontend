import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentGradeListItemComponent } from './student-grade-list-item.component';

describe('StudentGradeListItemComponent', () => {
  let component: StudentGradeListItemComponent;
  let fixture: ComponentFixture<StudentGradeListItemComponent>;



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentGradeListItemComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentGradeListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
