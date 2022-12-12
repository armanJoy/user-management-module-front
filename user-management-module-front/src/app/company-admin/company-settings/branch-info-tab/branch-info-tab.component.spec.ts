import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchInfoTabComponent } from './branch-info-tab.component';

describe('BranchInfoTabComponent', () => {
  let component: BranchInfoTabComponent;
  let fixture: ComponentFixture<BranchInfoTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchInfoTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchInfoTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
