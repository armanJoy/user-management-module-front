import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendSubRequestComponent } from './send-sub-request.component';

describe('SendSubRequestComponent', () => {
  let component: SendSubRequestComponent;
  let fixture: ComponentFixture<SendSubRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendSubRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendSubRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
