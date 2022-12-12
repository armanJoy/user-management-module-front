import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectInfoTabComponent } from './project-info-tab.component';

describe('ProjectInfoTabComponent', () => {
  let component: ProjectInfoTabComponent;
  let fixture: ComponentFixture<ProjectInfoTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectInfoTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectInfoTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
