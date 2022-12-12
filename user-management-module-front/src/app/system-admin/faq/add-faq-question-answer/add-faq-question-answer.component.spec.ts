import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFaqQuestionAnswerComponent } from './add-faq-question-answer.component';

describe('AddFaqQuestionAnswerComponent', () => {
  let component: AddFaqQuestionAnswerComponent;
  let fixture: ComponentFixture<AddFaqQuestionAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFaqQuestionAnswerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFaqQuestionAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
