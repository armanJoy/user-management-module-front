import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySettingsTabsComponent } from './company-settings-tabs.component';

describe('CompanySettingsTabsComponent', () => {
  let component: CompanySettingsTabsComponent;
  let fixture: ComponentFixture<CompanySettingsTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanySettingsTabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanySettingsTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
