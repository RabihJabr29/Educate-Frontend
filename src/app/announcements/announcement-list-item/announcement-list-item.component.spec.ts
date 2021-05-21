import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementListItemComponent } from './announcement-list-item.component';

describe('AnnouncementListItemComponent', () => {
  let component: AnnouncementListItemComponent;
  let fixture: ComponentFixture<AnnouncementListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
