import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataRestoreMenuComponent } from './data-restore-menu.component';

describe('DataRestoreMenuComponent', () => {
  let component: DataRestoreMenuComponent;
  let fixture: ComponentFixture<DataRestoreMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataRestoreMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataRestoreMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
