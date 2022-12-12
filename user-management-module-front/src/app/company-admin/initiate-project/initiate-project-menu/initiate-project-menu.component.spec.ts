import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiateProjectMenuComponent } from './initiate-project-menu.component';

describe('InitiateProjectMenuComponent', () => {
  let component: InitiateProjectMenuComponent;
  let fixture: ComponentFixture<InitiateProjectMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitiateProjectMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiateProjectMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
