import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyInfoTabComponent } from './company-info-tab.component';

describe('CompanyInfoTabComponent', () => {
  let component: CompanyInfoTabComponent;
  let fixture: ComponentFixture<CompanyInfoTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyInfoTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyInfoTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
