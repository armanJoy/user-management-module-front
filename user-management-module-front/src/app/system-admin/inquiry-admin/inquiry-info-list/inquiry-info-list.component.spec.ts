import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryInfoListComponent } from './inquiry-info-list.component';

describe('InquiryInfoListComponent', () => {
  let component: InquiryInfoListComponent;
  let fixture: ComponentFixture<InquiryInfoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InquiryInfoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InquiryInfoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
