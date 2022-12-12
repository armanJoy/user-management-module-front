import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessorAdminComponent } from './processor-admin.component';

describe('ProcessorAdminComponent', () => {
  let component: ProcessorAdminComponent;
  let fixture: ComponentFixture<ProcessorAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessorAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessorAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
