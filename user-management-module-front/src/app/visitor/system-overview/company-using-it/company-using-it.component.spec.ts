import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyUsingItComponent } from './company-using-it.component';

describe('CompanyUsingItComponent', () => {
  let component: CompanyUsingItComponent;
  let fixture: ComponentFixture<CompanyUsingItComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyUsingItComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyUsingItComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
