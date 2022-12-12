import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultCompanySwitchComponent } from './default-company-switch.component';

describe('DefaultCompanySwitchComponent', () => {
  let component: DefaultCompanySwitchComponent;
  let fixture: ComponentFixture<DefaultCompanySwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultCompanySwitchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultCompanySwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
