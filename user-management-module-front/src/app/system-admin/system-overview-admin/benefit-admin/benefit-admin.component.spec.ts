import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitAdminComponent } from './benefit-admin.component';

describe('BenefitAdminComponent', () => {
  let component: BenefitAdminComponent;
  let fixture: ComponentFixture<BenefitAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenefitAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BenefitAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
