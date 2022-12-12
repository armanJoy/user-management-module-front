import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoryTabComponent } from './add-category-tab.component';

describe('AddCategoryTabComponent', () => {
  let component: AddCategoryTabComponent;
  let fixture: ComponentFixture<AddCategoryTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCategoryTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCategoryTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
