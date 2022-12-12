import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaleSettingTabComponent } from './scale-setting-tab.component';

describe('ScaleSettingTabComponent', () => {
  let component: ScaleSettingTabComponent;
  let fixture: ComponentFixture<ScaleSettingTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScaleSettingTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScaleSettingTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
