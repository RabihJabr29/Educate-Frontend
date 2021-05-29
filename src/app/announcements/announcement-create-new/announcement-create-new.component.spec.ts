import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementCreateNewComponent } from './announcement-create-new.component';

describe('AnnouncementCreateNewComponent', () => {
  let component: AnnouncementCreateNewComponent;
  let fixture: ComponentFixture<AnnouncementCreateNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementCreateNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementCreateNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
