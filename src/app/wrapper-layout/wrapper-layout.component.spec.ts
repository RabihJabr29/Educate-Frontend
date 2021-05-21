import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WrapperLayoutComponent } from './wrapper-layout.component';

describe('WrapperLayoutComponent', () => {
  let component: WrapperLayoutComponent;
  let fixture: ComponentFixture<WrapperLayoutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WrapperLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
