import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WasteDefComponent } from './waste-def.component';

describe('WasteDefComponent', () => {
  let component: WasteDefComponent;
  let fixture: ComponentFixture<WasteDefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WasteDefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WasteDefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
