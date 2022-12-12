import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GasolineTabComponent } from './gasoline-tab.component';

describe('GasolineTabComponent', () => {
  let component: GasolineTabComponent;
  let fixture: ComponentFixture<GasolineTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GasolineTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GasolineTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
