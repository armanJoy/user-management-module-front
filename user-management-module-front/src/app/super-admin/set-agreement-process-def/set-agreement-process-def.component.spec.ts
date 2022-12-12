import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetAgreementProcessDefComponent } from './set-agreement-process-def.component';

describe('SetAgreementProcessDefComponent', () => {
  let component: SetAgreementProcessDefComponent;
  let fixture: ComponentFixture<SetAgreementProcessDefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetAgreementProcessDefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetAgreementProcessDefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
