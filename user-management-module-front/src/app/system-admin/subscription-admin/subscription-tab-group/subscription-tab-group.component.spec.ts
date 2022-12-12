import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionTabGroupComponent } from './subscription-tab-group.component';

describe('SubscriptionTabGroupComponent', () => {
  let component: SubscriptionTabGroupComponent;
  let fixture: ComponentFixture<SubscriptionTabGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionTabGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionTabGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
