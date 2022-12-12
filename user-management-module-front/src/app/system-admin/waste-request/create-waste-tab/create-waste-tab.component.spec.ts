import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWasteTabComponent } from './create-waste-tab.component';

describe('CreateWasteTabComponent', () => {
  let component: CreateWasteTabComponent;
  let fixture: ComponentFixture<CreateWasteTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWasteTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWasteTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
