import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationSubscriptionStatusComponent } from './confirmation-subscription-status.component';

describe('ConfirmationSubscriptionStatusComponent', () => {
  let component: ConfirmationSubscriptionStatusComponent;
  let fixture: ComponentFixture<ConfirmationSubscriptionStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationSubscriptionStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationSubscriptionStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
