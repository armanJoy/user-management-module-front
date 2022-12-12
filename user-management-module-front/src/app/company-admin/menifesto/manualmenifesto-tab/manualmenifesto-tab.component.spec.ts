import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualmenifestoTabComponent } from './manualmenifesto-tab.component';

describe('ManualmenifestoTabComponent', () => {
  let component: ManualmenifestoTabComponent;
  let fixture: ComponentFixture<ManualmenifestoTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualmenifestoTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualmenifestoTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
