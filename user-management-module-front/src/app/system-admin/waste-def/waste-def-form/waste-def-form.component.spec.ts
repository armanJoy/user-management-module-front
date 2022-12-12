import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WasteDefFormComponent } from './waste-def-form.component';

describe('WasteDefFormComponent', () => {
  let component: WasteDefFormComponent;
  let fixture: ComponentFixture<WasteDefFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WasteDefFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WasteDefFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
