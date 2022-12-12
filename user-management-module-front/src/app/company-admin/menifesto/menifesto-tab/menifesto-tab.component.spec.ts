import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenifestoTabComponent } from './menifesto-tab.component';

describe('MenifestoTabComponent', () => {
  let component: MenifestoTabComponent;
  let fixture: ComponentFixture<MenifestoTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenifestoTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenifestoTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
