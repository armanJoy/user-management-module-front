import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMethodePopupComponent } from './add-methode-popup.component';

describe('AddMethodePopupComponent', () => {
  let component: AddMethodePopupComponent;
  let fixture: ComponentFixture<AddMethodePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMethodePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMethodePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
