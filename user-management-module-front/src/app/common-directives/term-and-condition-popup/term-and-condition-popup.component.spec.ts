import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermAndConditionPopupComponent } from './term-and-condition-popup.component';

describe('TermAndConditionPopupComponent', () => {
  let component: TermAndConditionPopupComponent;
  let fixture: ComponentFixture<TermAndConditionPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermAndConditionPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermAndConditionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
