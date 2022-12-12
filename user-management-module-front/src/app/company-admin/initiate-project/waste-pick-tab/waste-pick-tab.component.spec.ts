import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WastePickTabComponent } from './waste-pick-tab.component';

describe('WastePickTabComponent', () => {
  let component: WastePickTabComponent;
  let fixture: ComponentFixture<WastePickTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WastePickTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WastePickTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
