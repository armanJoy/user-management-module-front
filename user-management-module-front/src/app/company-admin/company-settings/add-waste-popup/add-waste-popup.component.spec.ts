import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWastePopupComponent } from './add-waste-popup.component';

describe('AddWastePopupComponent', () => {
  let component: AddWastePopupComponent;
  let fixture: ComponentFixture<AddWastePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWastePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWastePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
