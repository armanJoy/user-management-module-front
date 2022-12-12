import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDisposalDateComponent } from './add-disposal-date.component';

describe('AddDisposalDateComponent', () => {
  let component: AddDisposalDateComponent;
  let fixture: ComponentFixture<AddDisposalDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDisposalDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDisposalDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
