import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManifestoListDirectiveComponent } from './manifesto-list-directive.component';

describe('ManifestoListDirectiveComponent', () => {
  let component: ManifestoListDirectiveComponent;
  let fixture: ComponentFixture<ManifestoListDirectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManifestoListDirectiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManifestoListDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
