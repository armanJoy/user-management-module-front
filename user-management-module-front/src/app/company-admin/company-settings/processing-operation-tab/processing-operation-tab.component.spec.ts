import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingOperationTabComponent } from './processing-operation-tab.component';

describe('ProcessingOperationTabComponent', () => {
  let component: ProcessingOperationTabComponent;
  let fixture: ComponentFixture<ProcessingOperationTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessingOperationTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessingOperationTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
