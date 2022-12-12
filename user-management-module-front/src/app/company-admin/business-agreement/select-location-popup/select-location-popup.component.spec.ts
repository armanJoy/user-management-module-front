import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectLocationPopupComponent } from './select-location-popup.component';

describe('SelectLocationPopupComponent', () => {
  let component: SelectLocationPopupComponent;
  let fixture: ComponentFixture<SelectLocationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectLocationPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectLocationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
