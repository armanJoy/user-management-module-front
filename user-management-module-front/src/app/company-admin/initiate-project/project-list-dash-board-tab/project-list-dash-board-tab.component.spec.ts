import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListDashBoardTabComponent } from './project-list-dash-board-tab.component';

describe('ProjectListDashBoardTabComponent', () => {
  let component: ProjectListDashBoardTabComponent;
  let fixture: ComponentFixture<ProjectListDashBoardTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectListDashBoardTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListDashBoardTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
