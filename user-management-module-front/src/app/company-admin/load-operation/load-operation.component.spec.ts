import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadOperationComponent } from './load-operation.component';

describe('LoadOperationComponent', () => {
  let component: LoadOperationComponent;
  let fixture: ComponentFixture<LoadOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadOperationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
