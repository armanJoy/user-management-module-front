import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetMethodePopupComponent } from './set-methode-popup.component';

describe('SetMethodePopupComponent', () => {
  let component: SetMethodePopupComponent;
  let fixture: ComponentFixture<SetMethodePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetMethodePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetMethodePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
