import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessCompletionMenuComponent } from './process-completion-menu.component';

describe('ProcessCompletionMenuComponent', () => {
  let component: ProcessCompletionMenuComponent;
  let fixture: ComponentFixture<ProcessCompletionMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessCompletionMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessCompletionMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
