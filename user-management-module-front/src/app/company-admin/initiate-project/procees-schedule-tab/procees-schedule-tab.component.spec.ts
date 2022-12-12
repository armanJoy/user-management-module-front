import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceesScheduleTabComponent } from './procees-schedule-tab.component';

describe('ProceesScheduleTabComponent', () => {
  let component: ProceesScheduleTabComponent;
  let fixture: ComponentFixture<ProceesScheduleTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProceesScheduleTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProceesScheduleTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
