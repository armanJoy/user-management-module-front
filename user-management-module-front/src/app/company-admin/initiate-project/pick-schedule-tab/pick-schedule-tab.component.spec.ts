import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickScheduleTabComponent } from './pick-schedule-tab.component';

describe('PickScheduleTabComponent', () => {
  let component: PickScheduleTabComponent;
  let fixture: ComponentFixture<PickScheduleTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickScheduleTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickScheduleTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
