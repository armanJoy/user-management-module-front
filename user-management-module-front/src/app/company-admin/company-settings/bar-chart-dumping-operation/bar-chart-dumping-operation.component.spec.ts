import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartDumpingOperationComponent } from './bar-chart-dumping-operation.component';

describe('BarChartDumpingOperationComponent', () => {
  let component: BarChartDumpingOperationComponent;
  let fixture: ComponentFixture<BarChartDumpingOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarChartDumpingOperationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarChartDumpingOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
