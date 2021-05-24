import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentElementComponent } from './content-element.component';

describe('ContentElementComponent', () => {
  let component: ContentElementComponent;
  let fixture: ComponentFixture<ContentElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
