import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementTabComponent } from './agreement-tab.component';

describe('AgreementTabComponent', () => {
  let component: AgreementTabComponent;
  let fixture: ComponentFixture<AgreementTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgreementTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
