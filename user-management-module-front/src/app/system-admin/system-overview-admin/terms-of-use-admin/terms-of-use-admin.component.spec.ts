import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsOfUseAdminComponent } from './terms-of-use-admin.component';

describe('TermsOfUseAdminComponent', () => {
  let component: TermsOfUseAdminComponent;
  let fixture: ComponentFixture<TermsOfUseAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermsOfUseAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsOfUseAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
