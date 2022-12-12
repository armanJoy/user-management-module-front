import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateScheduleMenuComponent } from './create-schedule-menu.component';

describe('CreateScheduleMenuComponent', () => {
  let component: CreateScheduleMenuComponent;
  let fixture: ComponentFixture<CreateScheduleMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateScheduleMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateScheduleMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
