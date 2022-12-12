import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaleSettingPopupComponent } from './scale-setting-popup.component';

describe('ScaleSettingPopupComponent', () => {
  let component: ScaleSettingPopupComponent;
  let fixture: ComponentFixture<ScaleSettingPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScaleSettingPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScaleSettingPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
