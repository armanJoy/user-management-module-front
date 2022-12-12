import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DumperAdminComponent } from './dumper-admin.component';

describe('DumperAdminComponent', () => {
  let component: DumperAdminComponent;
  let fixture: ComponentFixture<DumperAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DumperAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DumperAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
