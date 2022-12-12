import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPickPopupComponent } from './add-pick-popup.component';

describe('AddPickPopupComponent', () => {
  let component: AddPickPopupComponent;
  let fixture: ComponentFixture<AddPickPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPickPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPickPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
