import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationServicesComponent } from './operation-services.component';

describe('OperationServicesComponent', () => {
  let component: OperationServicesComponent;
  let fixture: ComponentFixture<OperationServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
