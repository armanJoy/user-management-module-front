import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPersonInChargePopupComponent } from './select-person-in-charge-popup.component';

describe('SelectPersonInChargePopupComponent', () => {
  let component: SelectPersonInChargePopupComponent;
  let fixture: ComponentFixture<SelectPersonInChargePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectPersonInChargePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPersonInChargePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
