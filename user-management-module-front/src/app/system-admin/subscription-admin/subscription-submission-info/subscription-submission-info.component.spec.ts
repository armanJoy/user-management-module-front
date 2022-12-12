import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionSubmissionInfoComponent } from './subscription-submission-info.component';

describe('SubscriptionSubmissionInfoComponent', () => {
  let component: SubscriptionSubmissionInfoComponent;
  let fixture: ComponentFixture<SubscriptionSubmissionInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionSubmissionInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionSubmissionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
