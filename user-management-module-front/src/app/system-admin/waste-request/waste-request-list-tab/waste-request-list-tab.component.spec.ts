import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WasteRequestListTabComponent } from './waste-request-list-tab.component';

describe('WasteRequestListTabComponent', () => {
  let component: WasteRequestListTabComponent;
  let fixture: ComponentFixture<WasteRequestListTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WasteRequestListTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WasteRequestListTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
