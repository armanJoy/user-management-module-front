import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationReportPopupComponent } from './validation-report-popup.component';

describe('ValidationReportPopupComponent', () => {
  let component: ValidationReportPopupComponent;
  let fixture: ComponentFixture<ValidationReportPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationReportPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationReportPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
