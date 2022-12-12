import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DumpingOperationTabComponent } from './dumping-operation-tab.component';

describe('DumpingOperationTabComponent', () => {
  let component: DumpingOperationTabComponent;
  let fixture: ComponentFixture<DumpingOperationTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DumpingOperationTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DumpingOperationTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
