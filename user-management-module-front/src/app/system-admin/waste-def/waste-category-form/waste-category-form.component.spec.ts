import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WasteCategoryFormComponent } from './waste-category-form.component';

describe('WasteCategoryFormComponent', () => {
  let component: WasteCategoryFormComponent;
  let fixture: ComponentFixture<WasteCategoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WasteCategoryFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WasteCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
