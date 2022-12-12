import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestReplyPopupComponent } from './request-reply-popup.component';

describe('RequestReplyPopupComponent', () => {
  let component: RequestReplyPopupComponent;
  let fixture: ComponentFixture<RequestReplyPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestReplyPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestReplyPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
