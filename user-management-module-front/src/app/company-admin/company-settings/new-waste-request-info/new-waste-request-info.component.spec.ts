import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWasteRequestInfoComponent } from './new-waste-request-info.component';

describe('NewWasteRequestInfoComponent', () => {
  let component: NewWasteRequestInfoComponent;
  let fixture: ComponentFixture<NewWasteRequestInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewWasteRequestInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewWasteRequestInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
