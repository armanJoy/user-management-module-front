import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleSetupMenuComponent } from './vehicle-setup-menu.component';

describe('VehicleSetupMenuComponent', () => {
  let component: VehicleSetupMenuComponent;
  let fixture: ComponentFixture<VehicleSetupMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleSetupMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleSetupMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
