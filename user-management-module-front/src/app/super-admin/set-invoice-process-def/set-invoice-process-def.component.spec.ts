import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetInvoiceProcessDefComponent } from './set-invoice-process-def.component';

describe('SetInvoiceProcessDefComponent', () => {
  let component: SetInvoiceProcessDefComponent;
  let fixture: ComponentFixture<SetInvoiceProcessDefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetInvoiceProcessDefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetInvoiceProcessDefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
