import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchInfoAddPopupComponent } from './branch-info-add-popup.component';

describe('BranchInfoAddPopupComponent', () => {
  let component: BranchInfoAddPopupComponent;
  let fixture: ComponentFixture<BranchInfoAddPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchInfoAddPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchInfoAddPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
