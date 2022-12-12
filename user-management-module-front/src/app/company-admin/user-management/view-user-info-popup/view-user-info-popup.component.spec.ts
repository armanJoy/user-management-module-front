import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserInfoPopupComponent } from './view-user-info-popup.component';

describe('ViewUserInfoPopupComponent', () => {
  let component: ViewUserInfoPopupComponent;
  let fixture: ComponentFixture<ViewUserInfoPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUserInfoPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserInfoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
