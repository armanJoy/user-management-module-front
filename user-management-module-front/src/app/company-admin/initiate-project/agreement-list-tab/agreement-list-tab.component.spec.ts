import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementListTabComponent } from './agreement-list-tab.component';

describe('AgreementListTabComponent', () => {
  let component: AgreementListTabComponent;
  let fixture: ComponentFixture<AgreementListTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgreementListTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementListTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
