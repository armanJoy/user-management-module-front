import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationInvoiceStatusComponent } from './confirmation-invoice-status.component';

describe('ConfirmationInvoiceStatusComponent', () => {
  let component: ConfirmationInvoiceStatusComponent;
  let fixture: ComponentFixture<ConfirmationInvoiceStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationInvoiceStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationInvoiceStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
