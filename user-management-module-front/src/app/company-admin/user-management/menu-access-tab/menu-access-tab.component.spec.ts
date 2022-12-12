import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAccessTabComponent } from './menu-access-tab.component';

describe('MenuAccessTabComponent', () => {
  let component: MenuAccessTabComponent;
  let fixture: ComponentFixture<MenuAccessTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuAccessTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuAccessTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
