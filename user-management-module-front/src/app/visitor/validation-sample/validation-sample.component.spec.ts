import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationSampleComponent } from './validation-sample.component';

describe('ValidationSampleComponent', () => {
  let component: ValidationSampleComponent;
  let fixture: ComponentFixture<ValidationSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationSampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
