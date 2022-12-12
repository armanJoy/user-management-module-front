import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceMenuComponent } from './invoice-menu.component';

describe('InvoiceMenuComponent', () => {
  let component: InvoiceMenuComponent;
  let fixture: ComponentFixture<InvoiceMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
