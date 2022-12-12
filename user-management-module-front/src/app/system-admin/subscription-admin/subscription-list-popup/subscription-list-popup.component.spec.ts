import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionListPopupComponent } from './subscription-list-popup.component';

describe('SubscriptionListPopupComponent', () => {
  let component: SubscriptionListPopupComponent;
  let fixture: ComponentFixture<SubscriptionListPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionListPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionListPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
