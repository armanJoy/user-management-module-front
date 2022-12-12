import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DumperAccountComponent } from './dumper-account.component';

describe('DumperAccountComponent', () => {
  let component: DumperAccountComponent;
  let fixture: ComponentFixture<DumperAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DumperAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DumperAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
