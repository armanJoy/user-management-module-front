import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectActionConfirmPopupComponent } from './project-action-confirm-popup.component';

describe('ProjectActionConfirmPopupComponent', () => {
  let component: ProjectActionConfirmPopupComponent;
  let fixture: ComponentFixture<ProjectActionConfirmPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectActionConfirmPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectActionConfirmPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
