import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarbonDioxideTabComponent } from './carbon-dioxide-tab.component';

describe('CarbonDioxideTabComponent', () => {
  let component: CarbonDioxideTabComponent;
  let fixture: ComponentFixture<CarbonDioxideTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarbonDioxideTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarbonDioxideTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
