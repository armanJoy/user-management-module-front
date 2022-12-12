import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessorAccountComponent } from './processor-account.component';

describe('ProcessorAccountComponent', () => {
  let component: ProcessorAccountComponent;
  let fixture: ComponentFixture<ProcessorAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessorAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessorAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
