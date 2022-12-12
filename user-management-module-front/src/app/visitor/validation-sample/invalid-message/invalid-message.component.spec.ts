import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidMessageComponent } from './invalid-message.component';

describe('InvalidMessageComponent', () => {
  let component: InvalidMessageComponent;
  let fixture: ComponentFixture<InvalidMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvalidMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalidMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
