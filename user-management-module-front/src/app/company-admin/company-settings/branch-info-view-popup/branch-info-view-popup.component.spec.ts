import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchInfoViewPopupComponent } from './branch-info-view-popup.component';

describe('BranchInfoViewPopupComponent', () => {
  let component: BranchInfoViewPopupComponent;
  let fixture: ComponentFixture<BranchInfoViewPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchInfoViewPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchInfoViewPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
