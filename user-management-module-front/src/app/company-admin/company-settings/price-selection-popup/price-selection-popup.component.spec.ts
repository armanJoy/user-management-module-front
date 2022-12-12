import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceSelectionPopupComponent } from './price-selection-popup.component';

describe('PriceSelectionPopupComponent', () => {
  let component: PriceSelectionPopupComponent;
  let fixture: ComponentFixture<PriceSelectionPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceSelectionPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceSelectionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
