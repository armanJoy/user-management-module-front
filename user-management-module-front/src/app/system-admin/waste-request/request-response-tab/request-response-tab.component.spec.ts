import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestResponseTabComponent } from './request-response-tab.component';

describe('RequestResponseTabComponent', () => {
  let component: RequestResponseTabComponent;
  let fixture: ComponentFixture<RequestResponseTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestResponseTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestResponseTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
