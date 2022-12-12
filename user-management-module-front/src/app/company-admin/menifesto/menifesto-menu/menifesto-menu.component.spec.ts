import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenifestoMenuComponent } from './menifesto-menu.component';

describe('MenifestoMenuComponent', () => {
  let component: MenifestoMenuComponent;
  let fixture: ComponentFixture<MenifestoMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenifestoMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenifestoMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
