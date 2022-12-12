import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectWastePopupComponent } from './select-waste-popup.component';

describe('SelectWastePopupComponent', () => {
  let component: SelectWastePopupComponent;
  let fixture: ComponentFixture<SelectWastePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectWastePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectWastePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
