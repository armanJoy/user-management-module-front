import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Co2TabComponent } from './co2-tab.component';

describe('Co2TabComponent', () => {
  let component: Co2TabComponent;
  let fixture: ComponentFixture<Co2TabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Co2TabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Co2TabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
