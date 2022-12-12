import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WasteCategoryComponent } from './waste-category.component';

describe('WasteCategoryComponent', () => {
  let component: WasteCategoryComponent;
  let fixture: ComponentFixture<WasteCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WasteCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WasteCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
