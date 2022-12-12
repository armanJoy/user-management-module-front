import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroductionFlowComponent } from './introduction-flow.component';

describe('IntroductionFlowComponent', () => {
  let component: IntroductionFlowComponent;
  let fixture: ComponentFixture<IntroductionFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntroductionFlowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroductionFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
