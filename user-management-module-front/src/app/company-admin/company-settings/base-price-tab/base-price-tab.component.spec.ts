import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasePriceTabComponent } from './base-price-tab.component';

describe('BasePriceTabComponent', () => {
  let component: BasePriceTabComponent;
  let fixture: ComponentFixture<BasePriceTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasePriceTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasePriceTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
