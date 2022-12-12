import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqQuestionAnswerAdminComponent } from './faq-question-answer-admin.component';

describe('FaqQuestionAnswerAdminComponent', () => {
  let component: FaqQuestionAnswerAdminComponent;
  let fixture: ComponentFixture<FaqQuestionAnswerAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqQuestionAnswerAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqQuestionAnswerAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
