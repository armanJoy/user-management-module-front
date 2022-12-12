import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportingOperationTabComponent } from './transporting-operation-tab.component';

describe('TransportingOperationTabComponent', () => {
  let component: TransportingOperationTabComponent;
  let fixture: ComponentFixture<TransportingOperationTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportingOperationTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportingOperationTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
