import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqQuestionAnswerComponent } from './faq-question-answer.component';

describe('FaqQuestionAnswerComponent', () => {
  let component: FaqQuestionAnswerComponent;
  let fixture: ComponentFixture<FaqQuestionAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqQuestionAnswerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqQuestionAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
