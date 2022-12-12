import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WasteRequestTabsComponent } from './waste-request-tabs.component';

describe('WasteRequestTabsComponent', () => {
  let component: WasteRequestTabsComponent;
  let fixture: ComponentFixture<WasteRequestTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WasteRequestTabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WasteRequestTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
