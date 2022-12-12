import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyWasteCoefficientComponent } from './company-waste-coefficient.component';

describe('CompanyWasteCoefficientComponent', () => {
  let component: CompanyWasteCoefficientComponent;
  let fixture: ComponentFixture<CompanyWasteCoefficientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyWasteCoefficientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyWasteCoefficientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
