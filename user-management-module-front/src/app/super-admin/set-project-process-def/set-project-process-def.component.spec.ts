import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetProjectProcessDefComponent } from './set-project-process-def.component';

describe('SetProjectProcessDefComponent', () => {
  let component: SetProjectProcessDefComponent;
  let fixture: ComponentFixture<SetProjectProcessDefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetProjectProcessDefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetProjectProcessDefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
