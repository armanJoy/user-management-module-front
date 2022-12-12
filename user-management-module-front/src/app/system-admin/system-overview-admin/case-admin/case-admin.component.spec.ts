import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseAdminComponent } from './case-admin.component';

describe('CaseAdminComponent', () => {
  let component: CaseAdminComponent;
  let fixture: ComponentFixture<CaseAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
