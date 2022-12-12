import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetNotificationProcessDefComponent } from './set-notification-process-def.component';

describe('SetNotificationProcessDefComponent', () => {
  let component: SetNotificationProcessDefComponent;
  let fixture: ComponentFixture<SetNotificationProcessDefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetNotificationProcessDefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetNotificationProcessDefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
