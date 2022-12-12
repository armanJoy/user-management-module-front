import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyStaticPageComponent } from './modify-static-page.component';

describe('ModifyStaticPageComponent', () => {
  let component: ModifyStaticPageComponent;
  let fixture: ComponentFixture<ModifyStaticPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyStaticPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyStaticPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
