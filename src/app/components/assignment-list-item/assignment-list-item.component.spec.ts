import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssignmentListItemComponent } from './assignment-list-item.component';

describe('AssignmentListItemComponent', () => {
  let component: AssignmentListItemComponent;
  let fixture: ComponentFixture<AssignmentListItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
