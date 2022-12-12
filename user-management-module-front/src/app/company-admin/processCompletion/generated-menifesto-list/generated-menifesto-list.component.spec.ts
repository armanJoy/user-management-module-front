import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratedMenifestoListComponent } from './generated-menifesto-list.component';

describe('GeneratedMenifestoListComponent', () => {
  let component: GeneratedMenifestoListComponent;
  let fixture: ComponentFixture<GeneratedMenifestoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratedMenifestoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratedMenifestoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
