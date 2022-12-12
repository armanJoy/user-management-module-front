import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewProjectTabComponent } from './create-new-project-tab.component';

describe('CreateNewProjectTabComponent', () => {
  let component: CreateNewProjectTabComponent;
  let fixture: ComponentFixture<CreateNewProjectTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewProjectTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewProjectTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
