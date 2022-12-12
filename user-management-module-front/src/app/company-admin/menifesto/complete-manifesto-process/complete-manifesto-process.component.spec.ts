import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteManifestoProcessComponent } from './complete-manifesto-process.component';

describe('CompleteManifestoProcessComponent', () => {
  let component: CompleteManifestoProcessComponent;
  let fixture: ComponentFixture<CompleteManifestoProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteManifestoProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteManifestoProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
