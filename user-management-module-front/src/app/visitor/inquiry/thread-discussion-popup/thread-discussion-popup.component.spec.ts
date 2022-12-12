import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadDiscussionPopupComponent } from './thread-discussion-popup.component';

describe('ThreadDiscussionPopupComponent', () => {
  let component: ThreadDiscussionPopupComponent;
  let fixture: ComponentFixture<ThreadDiscussionPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreadDiscussionPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreadDiscussionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
