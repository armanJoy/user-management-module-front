import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqVisitorComponent } from './faq-visitor.component';

describe('FaqVisitorComponent', () => {
  let component: FaqVisitorComponent;
  let fixture: ComponentFixture<FaqVisitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqVisitorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqVisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
