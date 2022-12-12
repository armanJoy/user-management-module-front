import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqCategoryAdminComponent } from './faq-category-admin.component';

describe('FaqCategoryAdminComponent', () => {
  let component: FaqCategoryAdminComponent;
  let fixture: ComponentFixture<FaqCategoryAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqCategoryAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqCategoryAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
