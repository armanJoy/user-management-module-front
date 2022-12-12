import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProcessingTabComponent } from './form-processing-tab.component';

describe('FormProcessingTabComponent', () => {
  let component: FormProcessingTabComponent;
  let fixture: ComponentFixture<FormProcessingTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormProcessingTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormProcessingTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
